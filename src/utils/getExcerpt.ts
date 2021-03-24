import { Richtext } from '../story';

import { getPlainText, GetPlainTextOptions } from './getPlainText';

interface GetExcerptOptions extends GetPlainTextOptions {
  /**
   * After how many characters the text should be cut off.
   *
   * @default 320
   */
  maxLength?: number;
}

export const getExcerpt = (
  richtext: Richtext,
  { maxLength, ...options }: GetExcerptOptions = { maxLength: 320 },
) => {
  const text = getPlainText(richtext, { addNewlines: false, ...options });

  if (!text || !maxLength || text?.length < maxLength) {
    return text;
  }

  return `${text?.substring(0, maxLength)}…`;
};
