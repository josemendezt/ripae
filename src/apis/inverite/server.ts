'use server';

import {
  InvKYCPayload,
  InvKYCResponse,
  InvSiteList,
} from '@/types/inverite/Type';

export async function getInveriteSiteKeys(): Promise<
  InvSiteList | undefined
> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INVERITE_API}/list`,
      {
        method: 'POST',
        headers: {
          // Authorization: process.env.INVERITE_MERCHANT_KEY,
          Auth: `${process.env.INVERITE_MERCHANT_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'sites',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      'There was a problem with your fetch operation:',
      error
    );
  }
}

export async function createKYC(
  payload: Partial<InvKYCPayload>
): Promise<InvKYCResponse | undefined> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INVERITE_API}/create`,
      {
        method: 'POST',
        headers: {
          // Authorization: process.env.INVERITE_MERCHANT_KEY,
          Auth: `${process.env.INVERITE_MERCHANT_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      'There was a problem with your fetch operation:',
      error
    );
  }
}
