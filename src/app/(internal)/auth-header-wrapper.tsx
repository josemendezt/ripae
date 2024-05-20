import React, { Suspense } from 'react';
import AuthHeader from './auth-header';
import { createClient } from '@/lib/supabase/server';
import { getUserDataServer } from '@/apis/user/server';
import { User } from '@/types/user/type';
import {
  getInveriteBankInfo,
  getInveriteIdInfo,
} from '@/apis/inverite/server';

async function AuthHeaderWrapper() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const userData = await getUserDataServer(
    data.user?.email as string
  );

  let inveriteIDInfo;

  let inveriteBankInfo;

  if (userData?.inverite_guid_bank) {
    inveriteIDInfo = await getInveriteIdInfo(
      userData.inverite_guid_bank
    );
  }

  if (userData?.inverite_guid_bank) {
    inveriteBankInfo = await getInveriteBankInfo(
      userData.inverite_guid_bank
    );
  }

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <AuthHeader
        idData={inveriteIDInfo}
        bankData={inveriteBankInfo}
        user={userData as User}
      />
    </Suspense>
  );
}

export default AuthHeaderWrapper;
