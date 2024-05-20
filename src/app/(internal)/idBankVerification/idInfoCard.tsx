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
import { CircleUserRound } from 'lucide-react';
import React, { useState } from 'react';
import GetDataSubmitButton from './getDataButton';

function IdInfoCard() {
  const [iframeData, setIframeData] = useState<InvKYCResponse>();
  const { idGuidData } = useInveriteStore();
  const { userStore } = useUserStore();

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

  const getKycData = async () => {};

  return (
    <Card className="w-full max-w-[1500px]">
      <CardHeader>
        <CardTitle>ID Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {idGuidData?.status !== 'Approved' && (
          <form method="post" action={handleSubmit}>
            <div className="w-full mb-4">
              {iframeData?.iframeurl ? (
                <>
                  <iframe
                    src={iframeData?.iframeurl}
                    width="100%"
                    height="970px"
                    allow="camera"
                  />
                  <div className="flex items-center gap-4 mt-4">
                    <p className="font-semibold">
                      Please Complete then process and then press the
                      button to update yor info status
                    </p>
                    <GetDataSubmitButton
                      icon={<CircleUserRound className="mr-2" />}
                      text="Get Status Info"
                      value="kyc_getData"
                    />
                  </div>
                </>
              ) : (
                <InveriteSubmitBtn
                  icon={<CircleUserRound size="200" />}
                  text="Validate your ID"
                  value="kyc_upsertData"
                />
              )}
            </div>
          </form>
        )}
        <span className="font-medium">Status:</span>
        <Badge
          className={`${getInveriteStatusColor(
            idGuidData?.status
          )} text-white ml-1`}
        >
          {idGuidData?.status || 'Not Started'}
        </Badge>
        {idGuidData?.status !== 'Approved' && (
          <div className="text-gray-500 dark:text-gray-400 mb-4 ">
            Your will need to validate your identity before you can
            have a loan agreement. To complete the KYC (Know Your
            Customer) process, you'll need to verify your identity by
            uploading a valid government-issued ID.
          </div>
        )}

        {idGuidData?.status === 'Approved' && (
          <div className="text-gray-500 dark:text-gray-400">
            Your ID has been successfully validated.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default IdInfoCard;
