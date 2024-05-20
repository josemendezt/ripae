'use client';

import { useInveriteStore } from '@/stores/inveriteStore';

import { BankGuidData, IDGuidData } from '@/types/inverite/Type';

import React, { useEffect } from 'react';
import IdInfoCard from './idInfoCard';
import BankInfoCard from './bankInfoCard';

function IdBankVerificationWrapper() {
  // const { idGuidData, setIdGuidData, bankGuidData, setBankGuidData } =
  //   useInveriteStore();

  // useEffect(() => {
  //   if (!idGuidData) {
  //     setIdGuidData(idData);
  //   }
  //   if (!bankGuidData) {
  //     setBankGuidData(bankData);
  //   }
  // }, [idData, bankData, idGuidData, bankGuidData]);

  return (
    <section className="flex flex-wrap gap-6 p-8 w-full h-auto">
      {/* <IdInfoCard /> */}
      <BankInfoCard />
    </section>
  );
}

export default IdBankVerificationWrapper;
