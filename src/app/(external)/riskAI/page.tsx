'use client';

import Lottie from 'lottie-react';
import Robot from '../../assets/robot.json';
import TypingTextWithVoice from './typingTextWithVoice';
import { useEffect, useState } from 'react';
import { Button, Textarea } from '@/components/ui';
import {
  incomeQuestion,
  loanQuestion,
  expensesQuestion,
  debtsQuestion,
  finalQuesiton,
  obligationsQuestion,
  unexpectedQuestion,
} from './contants';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/loader';

type RiskStep =
  | 'loanPurpose'
  | 'income'
  | 'obligations'
  | 'debts'
  | 'expenses'
  | 'unexpected'
  | 'final'
  | 'last';
export default function RiskAI() {
  const [hasStarted, setHasStarted] = useState(false);
  const [riskStep, setRiskStep] = useState<RiskStep>('loanPurpose');
  const [loader, setLoader] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const router = useRouter();
  const nextStep = () => {
    switch (riskStep) {
      case 'loanPurpose':
        setRiskStep('income');
        break;
      case 'income':
        setRiskStep('obligations');
        break;
      case 'obligations':
        setRiskStep('debts');
        break;
      case 'debts':
        setRiskStep('expenses');
        break;
      case 'expenses':
        setRiskStep('unexpected');
        break;
      case 'unexpected':
        setRiskStep('final');
        break;
      default:
        setRiskStep('last');
        break;
    }
  };

  const getText = () => {
    switch (riskStep) {
      case 'loanPurpose':
        return loanQuestion;
      case 'income':
        return incomeQuestion;
      case 'obligations':
        return obligationsQuestion;
      case 'debts':
        return debtsQuestion;
      case 'expenses':
        return expensesQuestion;
      case 'unexpected':
        return unexpectedQuestion;
      case 'final':
      default:
        return finalQuesiton;
    }
  };

  const toggleInterview = () => {
    setHasStarted(true);
  };

  const handleSubmit = () => {
    setInputVal('');
    nextStep();
  };

  const handleSpeak = async () => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(getText());
      speech.lang = 'en-US';
      speech.onend = () => console.log('Speech has finished.');

      window.speechSynthesis.speak(speech);
    } else {
      console.error(
        'SpeechSynthesis is not supported in this browser.'
      );
    }
  };

  useEffect(() => {
    if (hasStarted && riskStep !== 'last') {
      // Detect when the riskstep has changed to speak again
      handleSpeak();
    }
    if (riskStep === 'last') {
      setLoader(true);
      setTimeout(() => {
        router.push('/home');
      }, 3000);
    }
  }, [hasStarted, riskStep]);

  return (
    <div className="flex justify-center items-center h-[80vh] mt-12">
      {loader ? (
        <div>
          <div className="bg-secondary rounded-lg h-full p-12 text-xl">
            Thank you for providing comprehensive responses to these
            questions. This will help us in creating a thorough and
            precise financial evaluation for you.
          </div>
          <Loader />
        </div>
      ) : (
        <>
          {hasStarted && (
            <div className="max-w-md w-1/2">
              <Lottie animationData={Robot} />
            </div>
          )}
          <div className=" w-1/2">
            <div className="bg-secondary rounded-lg h-full p-12">
              <TypingTextWithVoice
                text={getText()}
                speed={50}
                hasStarted={hasStarted}
                toggleInterview={toggleInterview}
              />
            </div>
            {hasStarted && (
              <div>
                <Textarea
                  className="mt-12 h-44"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                  }}
                />
                <Button
                  onClick={handleSubmit}
                  className="mt-4 text-lg w-full"
                  size="lg"
                >
                  Submit Answer
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
