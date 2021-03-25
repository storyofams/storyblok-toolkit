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
      addNewlines ? '\n\n' : ' '
    }`;
  }

  return null;
};

const renderNodes = (nodes: any, addNewlines: boolean) =>
  nodes
    .map((node) => renderNode(node, addNewlines))
    .filter((node) => node !== null)
    .join('')
    // Replace multiple spaces with one
    .replace(/[^\S\r\n]{2,}/g, ' ');

export interface GetPlainTextOptions {
  /**
   * Whether to add newlines (`\n\n`) after nodes and instead of hr's and
   * br's.
   *
   * @default true
   */
  addNewlines?: boolean;
}

export const getPlainText = (
  richtext: Richtext,
  { addNewlines }: GetPlainTextOptions = {},
): string => {
  if (!richtext?.content?.length) {
    return '';
  }

  const text = renderNodes(
    richtext.content,
    addNewlines !== undefined ? addNewlines : true,
  );

  return text;
};
