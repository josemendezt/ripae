import { SignUpFlow } from '../../../types/user/type';

export const getSignUpFlow = (flow: SignUpFlow) => {
  switch (flow) {
    case 'personal':
      return '/signUp/personal';
    case 'financial':
      return '/signUp/employment';
    case 'kyc':
      return '/signUp/kyc';
    case 'bank':
      return '/signUp/bank';
    default:
      return '/home';
    //return '/signUp/accountSetUp';
  }
};

export const canadianProvinces = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  YT: 'Yukon',
};
