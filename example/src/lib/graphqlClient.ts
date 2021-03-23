import { getSdk } from '~/graphql/sdk';
import {
  getClient,
  getStaticPropsWithSdk,
} from '@storyofams/storyblok-toolkit';

const client = getClient({
  token: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
});

export const sdk = getSdk(client);

export const staticPropsWithSdk = getStaticPropsWithSdk(
  getSdk,
  client,
  process.env.STORYBLOK_PREVIEW_TOKEN,
);
