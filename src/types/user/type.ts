export type SignUpFlow =
  | 'personal'
  | 'financial'
  | 'kyc'
  | 'bank'
  | 'home';

export enum PaymentFrequency {
  MONTHLY = 'Monthly',
  SEMIMONTHLY = 'Semimonthly',
  BIWEEKLY = 'Biweekly',
  WEEKLY = 'Weekly',
}

export enum CanadianProvinces {
  AB = 'Alberta',
  BC = 'British Columbia',
  MB = 'Manitoba',
  NB = 'New Brunswick',
  NL = 'Newfoundland and Labrador',
  NS = 'Nova Scotia',
  NT = 'Northwest Territories',
  NU = 'Nunavut',
  ON = 'Ontario',
  PE = 'Prince Edward Island',
  QC = 'Quebec',
  SK = 'Saskatchewan',
  YT = 'Yukon',
}

export type User = {
  id: string; // uuid
  created_at: Date | string;
  first_name: string;
  middle_name?: string;
  phone?: string;
  last_name: string;
  address: string;
  dob: Date;
  email: string;
  role: string;
  sin: string;
  decrypted_sin: string;
  job: string;
  province: string;
  postal_code: string;
  city: string;
  job_time: number | string;
  income: number | string;
  expenses: number | string;
  payment_frequency: PaymentFrequency;
  signup_flow: SignUpFlow | null;
  politically_exposed: boolean | string;
  inverite_guid_kyc?: string;
  inverite_guid_bank?: string;
};
