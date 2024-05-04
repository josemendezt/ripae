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
import { updateUserData } from '@/apis/user/server';
import { CircleUserRound, Phone } from 'lucide-react';

function KYC({ link }: { link: string }) {
  const { userStore } = useUserStore();
  const [iframeData, setIframeData] = useState<InvKYCResponse>();
  const router = useRouter();

  const handleSubmit = async () => {
    const payload = {
      username: `ripae_${userStore?.id}_${userStore?.email}`,
      siteID: Number(process.env.NEXT_PUBLIC_INVERITE_KYC_SITE),
      referenceid: userStore?.id as string,
      firstName: userStore?.first_name,
      lastName: userStore?.last_name,
    };
    const data = await createKYC(payload);

    await updateUserData(
      {
        inverite_guid_kyc: data?.request_guid,
      },
      userStore?.email as string
    );

    setIframeData(data);
  };

  useEffect(() => {
    function iframeMessageHandler(event: MessageEvent): void {
      if (
        event.origin === 'https://sandbox.inverite.com' ||
        event.origin === 'https://live.inverite.com' ||
        event.origin === 'https://www.inverite.com'
      ) {
        const data = event.data;
        console.log('logDh', data);
        if (data.verified === 1) {
          // Realizar eventos de éxito aquí
        } else {
          // Realizar eventos de fallo aquí
        }
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
      <Card>
        <CardHeader>
          <CardTitle>Verify your ID</CardTitle>
          <CardDescription>
            To complete the KYC (Know Your Customer) process, you'll
            need to verify your identity by uploading a valid
            government-issued ID.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            {iframeData?.iframeurl ? (
              <iframe
                src={iframeData?.iframeurl}
                width="100%"
                height="900px"
                allow="camera"
              />
            ) : (
              <InveriteSubmitBtn
                icon={<CircleUserRound size="200" />}
                text="Validate your ID"
              />
            )}
          </form>
          <CardDescription className="m-4">
            You can skip this step for now, but you will need to do it
            before accept your first loan agreement
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-32"
            onClick={(e) => {
              e.preventDefault();
              router.replace('/signUp/lender/compliance');
            }}
          >
            Back
          </Button>
          <Button
            className="ml-auto w-32"
            onClick={() => router.push(link)}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default KYC;
