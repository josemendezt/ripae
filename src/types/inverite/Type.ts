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
};

export type InvKYCResponse = {
  request_guid: string;
  iframeurl: string;
  username: string;
  password: string;
};
