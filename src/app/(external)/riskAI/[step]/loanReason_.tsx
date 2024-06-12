'use client';

import { Button, Input, Textarea } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Message, useAssistant } from 'ai/react';
import { Loader2, SquareUserRound, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import aiAvatar from '../../../assets/AIAvatar.json';

export default function LoanReason() {
  const adminMsg = `Hi this your boss, You are assinting John who needs a loan of 500.
      Ask the reason why they need the loan and what put then in that situation, evaluate that is for a serious 
      reason (food, car repair, unexpected emergency, medical expenses, home expenses, etc), if they are asking it for a trivial reason 
      like new clothes, jewels, gambling, etc consider that as risky. Depending on the answer feel free to ask additional questions
      related to the purpose if something is not clear. You can only ask questions related to the purpose of the loan, nothing else. 
      Finally when you are ready define a score from 1 to 5 where 1 is very low risk and 5 is
      very high risk based on his answer and return the calification and explanation of why, remember to validate what Jhon says with the data in bakdata.json. 
      If you understand this instructions please just talk directly to John not me.`;
  const {
    status,
    messages,
    input,
    append,
    submitMessage,
    handleInputChange,
  } = useAssistant({
    api: '/api/loanPurpose',
    credentials: 'same-origin',
    body: {
      step: 'loanPurpose',
      adminMsg,
    },
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const refForm = useRef<any>(null);
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      submitMessage(event);
    }
  };

  useEffect(() => {
    if (status === 'in_progress' && messages.length >= 2) {
      setIsTalking(true);
      setTimeout(() => {
        setIsTalking(false);
      }, 3000);
    }
  }, [status, messages.length]);

  return (
    <div className="flex flex-col w-full max-w-md py-16 stretch mb-24">
      <div className="mx-auto flex flex-col justify-center items-center w-screen ">
        {messages.length ? (
          messages.map((m, index) => {
            return (
              <div key={m.id} className="whitespace-pre-wrap mb-8">
                <div className="flex gap-4">
                  {m.role === 'assistant' ? (
                    <div className="border-2 rounded bg-secondary h-16 w-16 text-center">
                      <Lottie
                        animationData={aiAvatar}
                        autoPlay={false}
                        loop={
                          isTalking && messages.length - 1 === index
                        }
                      />
                      <span className="text-xs">AI Analyst</span>
                    </div>
                  ) : (
                    <div className="border-2 rounded border-primary  h-16 w-16 text-center">
                      <UserRound size={60} color="#173167" />
                      <span className="text-xs">User</span>
                    </div>
                  )}
                  <div>
                    <div
                      className={cn(
                        'w-[500px] max-sm:w-[75vw]',
                        m.role === 'user'
                          ? ' p-4 rounded '
                          : 'bg-secondary p-4 rounded'
                      )}
                    >
                      {m.content}
                      <br />
                      <span className="text-sm mt-8 italic">
                        {m.role !== 'user' && 'AI Risk Analist'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-[500px] font-semibold text-lg text-center p-4  rounded">
            Welcome, this is our AI Risk Analyst, it will ask you some
            questions, please let it know when you are ready
          </div>
        )}
        {status === 'in_progress' && (
          <Loader2 className="animate-spin  mt-2" />
        )}
      </div>
      <form ref={refForm} onSubmit={submitMessage}>
        <div className="fixed bottom-0  flex gap-4 border-t p-4 items-center w-screen justify-center bg-secondary">
          <div className="flex gap-2 ">
            <div className="pl-12 max-sm:pl-0">
              <Textarea
                value={input}
                onKeyDown={handleKeyDown}
                className="p-2 mb-8 border w-[500px] max-sm:w-[75vw]"
                placeholder="Say something..."
                cols={6}
                onChange={handleInputChange}
              />
            </div>

            <Button type="submit">Send</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
