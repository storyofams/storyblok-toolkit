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
    {
      type: 'blok',
      attrs: {
        id: '9e4c398c-0973-4e58-97b7-2ad8e4f710d9',
        body: [
          {
            _uid: 'i-0562c6fd-620d-4be5-b95a-36e33c4dd091',
            body: [],
            component: 'button_group',
          },
        ],
      },
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

  it('should return plaintext without newlines if configured', async () => {
    const result = getPlainText(richtext, { addNewlines: false });

    expect(result).toBe(
      `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. `,
    );
  });

  it('should return an empty string from empty richtext', async () => {
    const rich = {
      type: 'doc',
      content: [],
    };
    const result = getPlainText(rich);

    expect(result).toBe('');
  });

  it('should return an empty string from empty richtext paragraph', async () => {
    const rich = {
      type: 'doc',
      content: [{ type: 'paragraph' }],
    };
    const result = getPlainText(rich);

    expect(result).toBe('');
  });
});
