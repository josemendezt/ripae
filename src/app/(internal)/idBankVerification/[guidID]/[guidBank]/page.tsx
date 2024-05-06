import {
  getInveriteIdInfo,
  getInveriteBankInfo,
} from '@/apis/inverite/server';

import React, { Suspense } from 'react';
import IdBankVerificationWrapper from '../../IDBankVerificationWrapper';
import { BankGuidData, IDGuidData } from '@/types/inverite/Type';

async function IdBank({
  params,
}: {
  params: { guidID: string; guidBank: string };
}) {
  const inveriteIDInfo = await getInveriteIdInfo(params.guidID);

  const inveriteBankInfo = await getInveriteBankInfo(params.guidBank);

  return (
    <Suspense fallback={<h2 className="m-4">Loading...</h2>}>
      <section className="w-full m-8">
        <IdBankVerificationWrapper
          idData={inveriteIDInfo as IDGuidData}
          bankData={inveriteBankInfo as BankGuidData}
        />
      </section>
    </Suspense>
  );
}

export default IdBank;
