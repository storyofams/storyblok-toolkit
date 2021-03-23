import { getPlainText } from '../getPlainText';

const richtext = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          text:
            'Far far away, behind the word mountains, far from the countries ',
          type: 'text',
        },
        {
          text: 'Vokalia',
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: '#',
                uuid: null,
                anchor: null,
                target: null,
                linktype: 'story',
              },
            },
          ],
        },
        {
          text: ' and ',
          type: 'text',
        },
        {
          text: 'Consonantia',
          type: 'text',
          marks: [
            {
              type: 'link',
              attrs: {
                href: '#',
                uuid: null,
                anchor: null,
                target: null,
                linktype: 'story',
              },
            },
          ],
        },
        {
          text:
            ', there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
          type: 'text',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          text:
            'It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
          type: 'text',
        },
      ],
    },
  ],
};

describe('[utils] getPlainText', () => {
  it('should return plaintext from richtext', async () => {
    const result = getPlainText(richtext);

    expect(result).toBe(
      `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.

It is a paradisematic country, in which roasted parts of sentences fly into your mouth.

`,
    );
  });
});
