import { useContext, useEffect } from 'react';

import { Story } from '../story';

import { StoryContext } from './context';

export const useStory = (newStory: Story) => {
  const context = useContext(StoryContext);

  useEffect(() => {
    context?.setStory(newStory);
  }, [newStory]);

  return context?.story === undefined ? newStory : context?.story;
};
