import { createKYC } from '@/apis/inverite/server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { InvKYCResponse } from '@/types/inverite/Type';
import React, { useEffect, useState } from 'react';
import InveriteSubmitBtn from './InveriteSubmitBtn';
import { useRouter } from 'next/navigation';
import { Landmark } from 'lucide-react';
import { updateUserData } from '@/apis/user/server';

function BankConnection() {
  const { userStore } = useUserStore();
  const [iframeData, setIframeData] = useState<InvKYCResponse>();
  const router = useRouter();

  const handleSubmit = async () => {
    const payload = {
      username: `ripae_${userStore?.id}_${userStore?.email}`,
      siteID: Number(process.env.NEXT_PUBLIC_INVERITE_KYC_BANK),
      referenceid: userStore?.id as string,
      firstName: userStore?.first_name,
      lastName: userStore?.last_name,
      risk_score: true,
    };
    const data = await createKYC(payload);

    await updateUserData(
      {
        inverite_guid_bank: data?.request_guid,
      },
      userStore?.email as string
    );
    setIframeData(data);
  };

  useEffect(() => {
    function iframeMessageHandler(event: MessageEvent): void {
      console.log('logE', event.origin);
      if (
        event.origin.match('https://(sandbox|live|www).inverite.com')
      ) {
        if (event.data === 'success') {
          // perform success operations here
        }
        return;
      }
    }

    const listener = (event: MessageEvent) => {
      iframeMessageHandler(event);
    };

    window.addEventListener('message', listener, false);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <div className="mx-auto max-w-2xl w-full space-y-6 py-12">
      <form action={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Bank Account</CardTitle>
            <CardDescription>
              Please connect your bank account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {iframeData?.iframeurl ? (
              <iframe
                src={iframeData?.iframeurl}
                width="100%"
                height="820px"
                allow="camera"
              />
            ) : (
              <InveriteSubmitBtn
                icon={<Landmark size="200" />}
                text="Connect you bank account"
              />
            )}
          </CardContent>
          <CardFooter className="mt-16">
            <Button
              variant="outline"
              className="w-32"
              onClick={(e) => {
                e.preventDefault();
                router.replace('/signUp/lender/kyc');
              }}
            >
              Back
            </Button>
            <Button
              className="ml-auto w-32"
              onClick={() => router.replace('/signUp/lender/kyc')}
            >
              Next
            </Button>
          </CardFooter>
          <CardDescription className="m-4">
            You can skip this step for now, but you will need to do it
            before accept your first loan agreement
          </CardDescription>
        </Card>
      </form>
    </div>
  );
}

export default BankConnection;
