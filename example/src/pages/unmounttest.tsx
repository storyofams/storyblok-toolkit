import React, { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { Box, Text, Flex } from 'rebass';
import SbEditable from 'storyblok-react';
import { sdk } from '~/lib/graphqlClient';
import { WithStoryProps, useStory, Image } from '@storyofams/storyblok-toolkit';

type GalleryProps = WithStoryProps;

const Gallery = ({ story: providedStory }: GalleryProps) => {
  const storyProp = useStory(providedStory);

  const [story, setStory] = useState(storyProp);

  useEffect(() => {
    setStory(null);
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 1228,
        mx: 'auto',
        px: 3,
        py: 6,
      }}
    >
      <Text mt={5} as="h1">
        Gallery
      </Text>
      {!!story && (
        <SbEditable content={story?.content}>
          <Flex mx={-2} mt={4} flexWrap="wrap">
            {story?.content?.images?.map((image) => (
              <Box key={image?.filename} width={['100%', '50%']} px={2} mb={3}>
                <Box
                  sx={{
                    borderRadius: '8px',
                  }}
                  height={['200px', '380px']}
                  overflow="hidden"
                >
                  <Image
                    src={image?.filename}
                    fluid={590}
                    alt=""
                    showPlaceholder={false}
                  />
                </Box>
              </Box>
            ))}
          </Flex>
        </SbEditable>
      )}
    </Box>
  );
};

export default Gallery;

export const getStaticProps: GetStaticProps = async () => {
  let story;
  let notFound = false;

  try {
    story = (await sdk.galleryItem({ slug: 'gallery' })).GalleryItem;
  } catch (e) {
    notFound = true;
  }

  return {
    props: {
      story,
    },
    notFound,
    // revalidate: 60,
  };
};
