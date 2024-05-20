'use client';
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
import { Landmark, Loader2 } from 'lucide-react';
import { updateUserData } from '@/apis/user/server';
import { updateUserData as updateUserDataClient } from '@/apis/user/client';
import { cn } from '@/lib/utils';

function BankConnection({
  link,
  editMode,
}: {
  link?: string;
  editMode?: boolean;
}) {
  const { userStore } = useUserStore();
  const [iframeData, setIframeData] = useState<InvKYCResponse>();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

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
    console.log('logN', data);
    await updateUserData(
      {
        inverite_guid_bank: data?.request_guid,
      },
      userStore?.email as string
    );
    setIframeData(data);
  };

  const goToNextPage = async () => {
    setIsLoading(true);

    if (!editMode) {
      await updateUserDataClient(
        {
          signup_flow: 'lenderDashboard',
        },
        userStore?.email as string
      );
    }

    if (link) {
      //Need server side reload here
      window.location.href = link;
    }
  };

  return (
    <Card className={cn('w-full', loading && 'pointer-events-none')}>
      <CardHeader>
        <CardTitle>Connect Your Bank Account</CardTitle>
        <CardDescription>
          Please connect your bank account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
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
        </form>
      </CardContent>
      {!editMode && (
        <>
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
              disabled={loading}
              className="ml-auto w-32"
              onClick={goToNextPage}
            >
              Next{' '}
              {loading && <Loader2 className="animate-spin  ml-2" />}
            </Button>
          </CardFooter>
          <CardDescription className="m-4">
            You can skip this step for now, but you will need to do it
            before accept your first loan agreement
          </CardDescription>
        </>
      )}
    </Card>
  );
}

export default BankConnection;
