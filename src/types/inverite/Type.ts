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
