import { AssistantResponse } from 'ai';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  // Parse the request body
  const input: {
    threadId: string | null;
    message: string;
    loanPurpose: string;
    adminMsg: string;
  } = await req.json();
  console.log('logI', input);
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

  const createdMessage = await openai.beta.threads.messages.create(
    threadId,
    {
      role: 'user',
      content: input.threadId ? input.message : input.adminMsg,
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
        tools: [
          {
            type: 'file_search',
          },
          {
            type: 'function',
            function: {
              name: 'saveCalification',
              description:
                'After the risk assestment is completed and you decide the calification you call this function and send as parameters the calification and the explanation of why that calification',
              parameters: {
                type: 'object',
                properties: {
                  calification: {
                    type: 'string',
                    description:
                      'calification for the borrower after the risk assesment is completed',
                  },
                  explanation: {
                    type: 'string',
                    description:
                      'Explanation on why you decided that calification after the risk assesment',
                  },
                },
                required: ['calification'],
              },
            },
          },
        ],
        tool_resources: {
          file_search: { vector_store_ids: [vectorStore.id] },
        },
      }
    );
  }
  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }: any) => {
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
                case 'saveCalification':
                  console.log('logTest2', toolCall);
                  break;

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
