import { createKYC } from '@/apis/inverite/server';
import { updateUserData } from '@/apis/user/server';
import InveriteSubmitBtn from '@/app/(external)/signUp/lender/[step]/InveriteSubmitBtn';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { getInveriteStatusColor } from '@/lib/utils';
import { useInveriteStore } from '@/stores/inveriteStore';
import { useUserStore } from '@/stores/userStore';
import { InvKYCResponse } from '@/types/inverite/Type';
import { Landmark } from 'lucide-react';
import React, { useState } from 'react';

function BankInfoCard() {
  const [iframeData, setIframeData] = useState<InvKYCResponse>();

  const { bankGuidData } = useInveriteStore();

  const { userStore } = useUserStore();

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

  return (
    <Card className="w-full max-w-[1500px]">
      <CardHeader>
        <CardTitle>Bank Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bankGuidData?.status !== 'Verified' && (
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
        )}
        <div className="flex items-center ">
          <span className="font-medium">Status:</span>
          <Badge
            className={` ${getInveriteStatusColor(
              bankGuidData?.status
            )} text-white ml-1`}
          >
            {bankGuidData?.status || 'Not Started'}
          </Badge>
        </div>
        {bankGuidData?.status === 'Verified' ? (
          <div className="text-gray-500 dark:text-gray-400">
            Your bank account number{' '}
            {bankGuidData.accounts[0]?.account} been successfully
            connected.
          </div>
        ) : (
          <div>
            <div className="text-gray-500 dark:text-gray-400 mb-4 ">
              Your will need to connect your bank account before you
              can have a loan agreement.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BankInfoCard;
