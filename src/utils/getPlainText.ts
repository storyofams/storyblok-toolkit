import {
  NODE_PARAGRAPH,
  NODE_HEADING,
  NODE_CODEBLOCK,
  NODE_QUOTE,
  NODE_OL,
  NODE_UL,
  NODE_LI,
  NODE_HR,
  NODE_BR,
} from 'storyblok-rich-text-react-renderer';

import { Richtext } from '../story';

const renderNode = (node: any, addNewlines: boolean) => {
  if (node.type === 'text') {
    return node.text;
  } else if (
    [
      NODE_PARAGRAPH,
      NODE_HEADING,
      NODE_CODEBLOCK,
      NODE_QUOTE,
      NODE_OL,
      NODE_UL,
      NODE_LI,
      NODE_HR,
      NODE_BR,
    ].includes(node.type)
  ) {
    return `${renderNodes(node.content, addNewlines)}${
      addNewlines ? '\n\n' : ''
    }`;
  }

  return null;
};

const renderNodes = (nodes: any, addNewlines: boolean) =>
  nodes
    .map((node) => renderNode(node, addNewlines))
    .filter((node) => node !== null)
    .join('')
    // Remove multiple spaces with one
    .replace(/[^\S\r\n]{2,}/g, ' ');

interface GetExcerptOptions {
  /* @default true */
  addNewlines?: boolean;
  maxLength?: number;
}

export const getPlainText = (
  richtext: Richtext,
  { addNewlines, maxLength }: GetExcerptOptions = {},
) => {
  if (!richtext?.content?.length) {
    return '';
  }

  const text = renderNodes(
    richtext.content,
    addNewlines !== undefined ? addNewlines : true,
  );

  if (!text || !maxLength || text?.length < maxLength) {
    return text;
  }

  return `${text?.substring(0, maxLength)}…`;
};
