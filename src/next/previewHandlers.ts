import type { NextApiRequest, NextApiResponse } from 'next';

interface NextPreviewHandlersProps {
  /**
   * Disable checking if a story with slug exists
   *
   * @default false
   */
  disableStoryCheck?: boolean;
  /**
   * A secret token (random string of characters) to activate preview mode.
   */
  previewToken: string;
  /**
   * Storyblok API token with preview access (access to draft versions)
   */
  storyblokToken: string;
}

export const nextPreviewHandlers = ({
  disableStoryCheck,
  previewToken,
  storyblokToken,
}: NextPreviewHandlersProps) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { token, slug, handle, ...rest } = req.query;

  if (handle?.[0] === 'clear') {
    res.clearPreviewData();
    return res.redirect(req.headers.referer || '/');
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (token !== previewToken) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const restParams =
    rest && Object.keys(rest).length
      ? `?${new URLSearchParams(rest as Record<string, string>).toString()}`
      : '';

  if (disableStoryCheck) {
    res.setPreviewData({});
    return res.redirect(`/${slug}${restParams}`);
  }

  // Fetch Storyblok to check if the provided `slug` exists
  let { story } = await fetch(
    `https://api.storyblok.com/v1/cdn/stories/${slug}?token=${storyblokToken}&version=draft`,
    {
      method: 'GET',
    },
  ).then((res) => res.json());

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!story || !story?.uuid) {
    return res.status(400).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/${story.full_slug}${restParams}`);
};
