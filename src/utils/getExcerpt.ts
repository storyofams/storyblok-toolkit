import { Richtext } from '../story';

import { getPlainText } from './getPlainText';

export const getExcerpt = (richtext: Richtext, maxLength = 320) =>
  getPlainText(richtext, { addNewlines: false, maxLength });
