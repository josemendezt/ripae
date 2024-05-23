import {
  createKYC,
  getInveriteBankInfo,
  inserBankData,
} from '@/apis/inverite/server';
import { updateUserData } from '@/apis/user/server';
import InveriteSubmitBtn from '@/app/(external)/signUp/[step]/InveriteSubmitBtn';
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
import { CircleUserRound, Landmark } from 'lucide-react';
import React, { useState } from 'react';
import GetDataSubmitButton from './getDataButton';

function BankInfoCard() {
  const [iframeData, setIframeData] = useState<InvKYCResponse>();

  const { bankGuidData, setBankGuidData } = useInveriteStore();
  const [bankJson, setBankJson] = useState<any>();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(bankJson)
      .then(() => {
        alert('JSON was copied on clipboard');
      })
      .catch((err) => {
        console.error('Error al copiar el texto: ', err);
      });
  };

  const { userStore } = useUserStore();

  const handleSubmit = async (form: FormData) => {
    const action = form.get('action');
    if (action === 'bank_getData' && userStore?.inverite_guid_bank) {
      const bankData = await getInveriteBankInfo(
        userStore.inverite_guid_bank
      );

      const upsertData = await inserBankData(
        bankData,
        userStore.id,
        'bank',
        userStore.inverite_guid_bank
      );
      setBankJson(JSON.stringify(upsertData));

      if (bankData) return setBankGuidData(bankData);
    }
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
    return setIframeData(data);
  };

  return (
    <Card className="w-full max-w-[1500px] h-fit">
      <CardHeader>
        <CardTitle>Bank Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <form method="POST" action={handleSubmit}>
          <div className="w-full mb-4">
            {bankGuidData?.status !== 'Verified' && (
              <>
                {iframeData?.iframeurl ? (
                  <>
                    <iframe
                      src={iframeData?.iframeurl}
                      width="100%"
                      height="820px"
                      allow="camera"
                    />
                    <p className="font-semibold">
                      Please Complete then process and then press the
                      button to update yor info status
                    </p>
                  </>
                ) : (
                  <InveriteSubmitBtn
                    icon={<Landmark size="200" />}
                    value="bank_upsertData"
                    text="Connect you bank account"
                  />
                )}
              </>
            )}
            <div className="flex items-center mt-4">
              <span className="font-medium">Status:</span>
              <Badge
                className={` ${getInveriteStatusColor(
                  bankGuidData?.status
                )} text-white ml-1`}
              >
                {bankGuidData?.status || 'Not Started'}
              </Badge>
            </div>
            {bankGuidData?.status === 'Verified' && (
              <div className="text-gray-500 dark:text-gray-400">
                Your bank account number{' '}
                {bankGuidData.accounts[0]?.account} been successfully
                connected.
              </div>
            )}
          </div>
          <GetDataSubmitButton
            icon={<CircleUserRound className="mr-2" />}
            text="Get Status Info"
            value="bank_getData"
          />
        </form>
        {bankJson && (
          <>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={copyToClipboard}
            >
              Copy JSON on clipboard
            </Button>
            <p>
              After you copy the JSON you can go to{` `}
              <a
                href="https://jsonformatter.curiousconcept.com"
                target="_blank"
                className="text-primary underline"
              >
                this link
              </a>
              . Paste it there to review it. (This is only for testing
              purposes, user won't have any of these options)
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default BankInfoCard;
