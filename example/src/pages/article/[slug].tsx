import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Box, Text } from 'rebass';
import SbEditable from 'storyblok-react';
import { render } from 'storyblok-rich-text-react-renderer';
import { sdk, staticPropsWithSdk } from '~/lib/graphqlClient';
import {
  WithStoryProps,
  withStory,
  getExcerpt,
  getPlainText,
  Image,
} from '@storyofams/storyblok-toolkit';

type ArticleProps = WithStoryProps;

const Article = ({ story }: ArticleProps) => {
  return (
    <Box
      sx={{
        maxWidth: 728,
        mx: 'auto',
        px: 3,
        py: 6,
      }}
    >
      <SbEditable content={story?.content}>
        <div>
          <Image
            width="100%"
            src={story?.content?.teaser_image?.filename}
            fluid={696}
            alt={story?.content?.title}
            lazy={false}
          />
          <Text mt={5} as="h1">
            {story?.content?.title}
          </Text>
          <Box mt={4}>
            <Text as="h3" mb="3">
              Richtext renderer
            </Text>
            {render(story?.content?.intro)}
          </Box>
          <Box mt={4}>
            <Text as="h3" mb="3">
              Excerpt
            </Text>
            {getExcerpt(story?.content?.intro)}
          </Box>
          <Box mt={4} sx={{ whiteSpace: 'pre-wrap' }}>
            <Text as="h3" mb="3">
              Plain text
            </Text>
            {getPlainText(story?.content?.intro)}
          </Box>
        </div>
      </SbEditable>
    </Box>
  );
};

export default withStory(Article);

export const getStaticProps: GetStaticProps = staticPropsWithSdk(
  async ({ params: { slug }, sdk }) => {
    let story;
    let notFound = false;

    try {
      story = (await sdk.articleItem({ slug: `article/${slug}` })).ArticleItem;
    } catch (e) {
      notFound = true;
    }

    return {
      props: {
        story,
      },
      notFound: notFound || !story,
      revalidate: 60,
    };
  },
);

export const getStaticPaths: GetStaticPaths = async () => {
  const stories = (await sdk.articleItems({ perPage: 100 })).ArticleItems.items;

  return {
    paths: stories?.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};
