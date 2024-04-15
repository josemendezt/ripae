import { SignUpFlow } from '../../../types/user/type';

export const getSignUpFlow = (flow: SignUpFlow) => {
  switch (flow) {
    case 'lenderPersonal':
      return '/signUp/lender/personal';
    case 'lenderFinancial':
      return '/signUp/lender/employment';
    case 'lenderCompliance':
      return '/signUp/lender/compliance';
    default:
      return '/signUp/lender/personal';
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
