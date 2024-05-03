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
import { useInveriteStore } from '@/stores/inveriteStore';
import { useUserStore } from '@/stores/userStore';
import { InvKYCResponse } from '@/types/inverite/Type';
import React, { useState } from 'react';
import KycSubmitBtn from './kycSubmitBtn';
import { useRouter } from 'next/navigation';

function KYC({ link }: { link: string }) {
  const { userStore } = useUserStore();
  const { siteList } = useInveriteStore();
  const [iframeData, setIframeData] = useState<InvKYCResponse>();
  const router = useRouter();
  //   const [state, submitAction, isPending] = useActionState(
  //     async () => {
  //       const data = await createKYC({
  //         username:
  //           siteList?.length && siteList[1].displayname && userStore?.id
  //             ? `${siteList[1].displayname}_${userStore?.id}`
  //             : '',
  //         siteID: siteList?.length ? siteList[1].siteId : 0,
  //         requestedfields: {
  //           picture: true,
  //           id_front: true,
  //           id_back: true,
  //         },
  //         referenceid: userStore?.id as string,
  //       });
  //       return data;
  //     },
  //     {
  //       request_guid: '',
  //       iframeurl: '',
  //     } as InvKYCResponse
  //   );

  const handleSubmit = async () => {
    const payload = {
      username:
        siteList?.sites?.length &&
        siteList.sites[1].displayname &&
        userStore?.id
          ? `${siteList.sites[1].displayname}_${userStore?.id}`
          : '',
      siteID: siteList?.sites?.length ? siteList.sites[1].siteID : 0,
      requestedfields: ['picture', 'id_front', 'id_back'],
      referenceid: userStore?.id as string,
      firstName: userStore?.first_name,
      lastName: userStore?.last_name,
      // email: userStore?.email,
    };
    const data = await createKYC(payload);

    setIframeData(data);

    // const windowFeatures =
    //   'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes,width=800,height=600';
    // window.open(data?.iframeurl, 'newWindow', windowFeatures);
  };

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
                height="820px"
                allow="camera"
              />
            ) : (
              <KycSubmitBtn />
            )}
          </form>
        </CardContent>
        <CardFooter className="mt-16">
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
        <CardDescription className="m-4">
          You can skip this step for now, but you will need to do it
          before accept your first loan agreement
        </CardDescription>
      </Card>
    </div>
  );
}

export default KYC;
