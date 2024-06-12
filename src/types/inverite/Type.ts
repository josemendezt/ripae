export type InvSiteList = {
  sites: {
    siteID: number;
    displayname: string;
    url: string | null;
  }[];
};

export type InvKYCPayload = {
  username: string; // InveriteSiteName_(referenceid)
  siteID: number;
  requestedfields: string[];
  referenceid: string; // user id from database
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export type InvKYCResponse = {
  request_guid: string;
  iframeurl: string;
  username: string;
  password: string;
};

export type IDGuidData = {
  request: string;
  referenceid: string;
  status: 'Approved' | 'Denied' | 'Not Started';
  firstname: string;
  lastname: string;
  birthdate: string | Date;
  similarity: number;
  city: string;
  address: string;
  province: string;
  postal: string;
  calculated_age: string;
  gender: 'M' | 'F';
};

export type InveriteStatus =
  | 'Approved'
  | 'Denied'
  | 'Not Started'
  | 'Verified'
  | 'Processing'
  | 'Authentication Failed'
  | 'Attempted but failed';

export type BankGuidData = {
  name: string;
  complete_datetime: string | Date;
  referenceid: string;
  request: string;
  status:
    | 'Verified'
    | 'Not Started'
    | 'Processing'
    | 'Authentication Failed'
    | 'Attempted but failed';
  type: 'bankverify';
  accounts: {
    type: string;
    membership_number: string;
    account_description: string;
    institution: string;
    account: string;
    routing_code: string;
    transit: string;
    bank_pdf_statements: {
      name: string;
      link: string;
    }[];
    statistics: {
      [key: string]: string;
    };
    bank: string;
    transactions: {
      date: string | Date;
      details: string;
      category: string;
      credit: string;
      debit: string;
      flags: string[];
      balance: string;
    };
  }[];
  payschedules: {
    score: number;
    account: string;
    details: string;
    income_type: string;
    monthly_income: string;
    frequency: string;
    payments: [
      {
        date: string | Date;
        details: string;
        category: string;
        credit: string;
        debit: string;
        flags: string[];
        balance: string;
      },
    ];
    future_payments: (string | Date)[];
    missed_payments: [];
  }[];
  all_bank_pdf_statements: {
    name: string;
    link: string;
  }[];
  address: string;
  contacts: {
    type: string;
    contact: string;
  }[];
};

export type BankData = {
  displayName: string;
  complete_datetime: string | Date;
  accounts: {
    type: string;
    statistics: Statistics;
  }[];
  payschedules: {
    score: number;
    account: string;
    details: string;
    income_type: string;
    monthly_income: string;
    frequency: string;
    payments: Payment[];
    future_payments: (string | Date)[];
    missed_payments: Payment[];
  }[];
};

type Payment = {
  date: string | Date;
  details: string;
  category: string;
  credit: string;
  debit: string;
  flags: string[];
  balance: string;
};

type TransactionStats = {
  number_of_deposit: string;
  amount_of_deposit: string;
  average_number_of_deposit: string;
  average_amount_of_deposit: string;
  highest_deposit: string;
  lowest_deposit: string;
  number_of_withdrawal: string;
  amount_of_withdrawal: string;
  average_number_of_withdrawal: string;
  average_amount_of_withdrawal: string;
  highest_withdrawal: string;
  lowest_withdrawal: string;
  number_of_nsf: string;
  average_number_nsf: string;
  highest_balance: string;
  lowest_balance: string;
  average_balance: string;
  highest_overdraft: string;
  lowest_overdraft: string;
  number_of_overdraft: string;
  average_amount_overdraft: string;
  newest_transaction: string;
  oldest_transaction: string;
};

type MonthlyIncome = {
  [key: string]: string;
};

type MonthlyFrequency = {
  [key: string]: string;
};

type MonthlyCategoryStats = {
  start: string;
  end: string;
  result: {
    [key: string]: string;
  };
};

type Statistics = {
  mean_closing_balance: string;
  mean_closing_balance_30: string;
  debits_30_count: string;
  credits_30_count: string;
  debits_30_total: string;
  credits_30_total: string;
  returns_30_count: string;
  returns_30_debits: string;
  returns_30_credits: string;
  returns_30_net: string;
  loans_30_count: string;
  loans_30_debits: string;
  loans_30_credits: string;
  loans_30_net: string;
  payday_30_count: string;
  payday_30_debits: string;
  payday_30_credits: string;
  payday_30_net: string;
  overdraft_30_count: string;
  overdraft_30_debits: string;
  overdraft_30_credits: string;
  overdraft_30_net: string;
  debits_60_count: string;
  credits_60_count: string;
  debits_60_total: string;
  credits_60_total: string;
  returns_60_count: string;
  returns_60_debits: string;
  returns_60_credits: string;
  returns_60_net: string;
  loans_60_count: string;
  loans_60_debits: string;
  loans_60_credits: string;
  loans_60_net: string;
  payday_60_count: string;
  payday_60_debits: string;
  payday_60_credits: string;
  payday_60_net: string;
  overdraft_60_count: string;
  overdraft_60_debits: string;
  overdraft_60_credits: string;
  overdraft_60_net: string;
  debits_90_count: string;
  credits_90_count: string;
  debits_90_total: string;
  credits_90_total: string;
  returns_90_count: string;
  returns_90_debits: string;
  returns_90_credits: string;
  returns_90_net: string;
  loans_90_count: string;
  loans_90_debits: string;
  loans_90_credits: string;
  loans_90_net: string;
  payday_90_count: string;
  payday_90_debits: string;
  payday_90_credits: string;
  payday_90_net: string;
  overdraft_90_count: string;
  overdraft_90_debits: string;
  overdraft_90_credits: string;
  overdraft_90_net: string;
  debits_180_count: string;
  credits_180_count: string;
  debits_180_total: string;
  credits_180_total: string;
  returns_180_count: string;
  returns_180_debits: string;
  returns_180_credits: string;
  returns_180_net: string;
  loans_180_count: string;
  loans_180_debits: string;
  loans_180_credits: string;
  loans_180_net: string;
  payday_180_count: string;
  payday_180_debits: string;
  payday_180_credits: string;
  payday_180_net: string;
  overdraft_180_count: string;
  overdraft_180_debits: string;
  overdraft_180_credits: string;
  overdraft_180_net: string;
  debits_365_count: string;
  credits_365_count: string;
  debits_365_total: string;
  credits_365_total: string;
  returns_365_count: string;
  returns_365_debits: string;
  returns_365_credits: string;
  returns_365_net: string;
  loans_365_count: string;
  loans_365_debits: string;
  loans_365_credits: string;
  loans_365_net: string;
  payday_365_count: string;
  payday_365_debits: string;
  payday_365_credits: string;
  payday_365_net: string;
  overdraft_365_count: string;
  overdraft_365_debits: string;
  overdraft_365_credits: string;
  overdraft_365_net: string;
  mean_closing_balance_60: string;
  mean_closing_balance_90: string;
  mean_closing_balance_180: string;
  mean_closing_balance_365: string;
  has_30_days: boolean;
  has_60_days: boolean;
  has_90_days: boolean;
  has_180_days: boolean;
  has_365_days: boolean;
  days_of_history: string;
  mean_balance_after_payroll: string;
  current_overdraft: boolean;
  quarter_all_time: TransactionStats;
  quarter_3_months: TransactionStats;
  quarter_6_months: TransactionStats;
  quarter_9_months: TransactionStats;
  quarter_12_months: TransactionStats;
  employer_monthly_income: MonthlyIncome;
  government_monthly_income: MonthlyIncome;
  total_monthly_credit: MonthlyIncome;
  government_monthly_income_freq: MonthlyFrequency;
  employer_monthly_income_freq: MonthlyFrequency;
  average_monthly_employer_income: string;
  average_monthly_govt_income: string;
  average_monthly_non_employer_income: string;
  average_monthly_free_cash_flow: string;
  employer_income_30_to_average: string;
  total_deposit_trend: string;
  shopping_debit_count: string;
  shopping_debit_total: string;
  shopping_credit_count: string;
  shopping_credit_total: string;
  shopping_net: string;
  home_debit_count: string;
  home_debit_total: string;
  home_credit_count: string;
  home_credit_total: string;
  home_net: string;
  education_debit_count: string;
  education_debit_total: string;
  education_credit_count: string;
  education_credit_total: string;
  education_net: string;
  transfer_debit_count: string;
  transfer_debit_total: string;
  transfer_credit_count: string;
  transfer_credit_total: string;
  transfer_net: string;
  auto_and_transport_debit_count: string;
  auto_and_transport_debit_total: string;
  auto_and_transport_credit_count: string;
  auto_and_transport_credit_total: string;
  auto_and_transport_net: string;
  income_debit_count: string;
  income_debit_total: string;
  income_credit_count: string;
  income_credit_total: string;
  income_net: string;
  food_and_dining_debit_count: string;
  food_and_dining_debit_total: string;
  food_and_dining_credit_count: string;
  food_and_dining_credit_total: string;
  food_and_dining_net: string;
  insurance_debit_count: string;
  insurance_debit_total: string;
  insurance_credit_count: string;
  insurance_credit_total: string;
  insurance_net: string;
  bills_and_utilities_debit_count: string;
  bills_and_utilities_debit_total: string;
  bills_and_utilities_credit_count: string;
  bills_and_utilities_credit_total: string;
  bills_and_utilities_net: string;
  fees_and_charges_debit_count: string;
  fees_and_charges_debit_total: string;
  fees_and_charges_credit_count: string;
  fees_and_charges_credit_total: string;
  fees_and_charges_net: string;
  monthly_category_stats: MonthlyCategoryStats[];
};
