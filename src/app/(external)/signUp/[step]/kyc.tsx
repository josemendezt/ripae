import { createKYC } from '@/apis/inverite/server';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  useToast,
} from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { InvKYCResponse } from '@/types/inverite/Type';
import React, { useEffect, useState } from 'react';
import InveriteSubmitBtn from './InveriteSubmitBtn';
import { useRouter } from 'next/navigation';
import { updateUserData } from '@/apis/user/server';
import { updateUserData as updateUserDataClient } from '@/apis/user/client';
import { CircleUserRound, Loader2, Phone } from 'lucide-react';
import { SignUpFlow, User } from '@/types/user/type';
import { cn } from '@/lib/utils';

function KYC({
  link,
  editMode,
}: {
  link?: string;
  editMode?: boolean;
}) {
  const { userStore } = useUserStore();
  const [iframeData, setIframeData] = useState<InvKYCResponse>();
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

  const goToNextPage = async () => {
    setIsLoading(true);

    if (!editMode) {
      await updateUserDataClient(
        {
          signup_flow: 'bank',
        },
        userStore?.email as string
      );
    }

    if (link) {
      router.push(link);
    }
  };

  return (
    <Card
      className={cn(
        'w-full',
        loading && 'pointer-events-none',
        !editMode && 'max-w-2xl'
      )}
    >
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
        {!editMode && (
          <CardDescription className="m-4">
            You can skip this step for now, but you will need to do it
            before accept your first loan agreement
          </CardDescription>
        )}
      </CardContent>
      {!editMode && (
        <CardFooter>
          <Button
            variant="outline"
            className="w-32"
            onClick={(e) => {
              e.preventDefault();
              router.replace('/signUp/employment');
            }}
          >
            Back
          </Button>
          <Button
            className="ml-auto w-32"
            disabled={loading}
            onClick={goToNextPage}
          >
            Next{' '}
            {loading && <Loader2 className="animate-spin  ml-2" />}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default KYC;
