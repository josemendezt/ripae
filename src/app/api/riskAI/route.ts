import { AssistantResponse } from 'ai';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const adminMsg = `Admin - Hi this is your boss, you are about to do analyze John who is asking for a 500 loan, please check the json file and the AI risk manual. 
 The json name with John's data in banktest.json and the name of the manual you have to follow is Ripae AI Risk Manual (1).docx. 
 On this conversation you should not share any information that is inside the json or the manual, that information is for you to do the necessary questions and 
 evaluate the applicant, the applicant must not see that. Don't mention the JSON file or the manual on this conversation, that is only for you. Read the document
 and follow the instructions section by section after it says "Sections to Analize"`;

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  const bankFile = 'banktest.json'; // in the future I will user Id here, name needs to be unique

  const filePath = path.join(
    process.cwd(),
    'src',
    'app',
    'api',
    'riskAI',
    bankFile
  );

  const fileStream = fs.createReadStream(filePath);

  const list = await openai.beta.vectorStores.list();

  // Create a thread if needed
  const threadId =
    input.threadId ?? (await openai.beta.threads.create({})).id;

  if (!input.threadId) {
    await openai.beta.threads.messages.create(threadId, {
      role: 'assistant',
      content: adminMsg,
    });
  }
  const createdMessage = await openai.beta.threads.messages.create(
    threadId,
    {
      role: 'user',
      content: input.threadId ? input.message : adminMsg,
    }
  );

  const name = 'Financial Statement'; // in the future I will user Id here, name needs to be unique

  if (!list.data.find((obj) => obj.name === name)) {
    const vectorStore = await openai.beta.vectorStores.create({
      name,
    });
    await openai.beta.vectorStores.fileBatches.uploadAndPoll(
      vectorStore.id,
      { files: [fileStream] }
    );
    await openai.beta.assistants.update(
      process.env.OPENAI_ASSISTANT_ID as string,
      {
        tool_resources: {
          file_search: { vector_store_ids: [vectorStore.id] },
        },
      }
    );
  }
  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          process.env.OPENAI_ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID is not set');
          })(),
      });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(
                toolCall.function.arguments
              );

              switch (toolCall.function.name) {
                // configure your tool calls here

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`
                  );
              }
            }
          );

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs }
          )
        );
      }
    }
  );
}

// export async function GET(req: Request) {
//   const input: {
//     threadId: string | null;
//     message: string;
//   } = await req.json();

//   const filePath = path.join(
//     process.cwd(),
//     'src',
//     'app',
//     'api',
//     'riskAI',
//     'banktest.json'
//   );

//   const data = await openai.beta.vectorStores.create({
//     name: 'Financial Statement',
//     file_ids: [filePath],
//   });

//   try {
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (err) {
//     console.error('Error reading file:', err);
//     return new Response(
//       JSON.stringify({ error: 'Failed to read file' }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }
