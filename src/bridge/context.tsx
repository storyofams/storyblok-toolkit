import React, {
  createContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import equal from 'fast-deep-equal';

import { Story } from '../story';

import { init } from './init';

interface ContextProps {
  story: Story;
  setStory(story: Story): void;
}

interface ProviderProps {
  children: ReactNode;
  /*
   * Relations that need to be resolved in preview mode, for example:
   * `['Post.author']`
   */
  resolveRelations?: string[];
}

const StoryContext = createContext<ContextProps | undefined>(undefined);

const StoryProvider = ({ children, resolveRelations }: ProviderProps) => {
  const [, setStoryState] = useState(undefined);
  const storyRef = useRef<Story | undefined>(undefined);

  const onStoryInput = (story: Story) => {
    storyRef.current = story;
    setStoryState(story);
  };

  const setStory = (newStory: Story) => {
    if (storyRef.current !== undefined && !equal(storyRef.current, newStory)) {
      onStoryInput(newStory);
    } else {
      storyRef.current = newStory;
    }
  };

  useEffect(() => {
    if (window?.location?.search?.includes('_storyblok=')) {
      init(storyRef.current, onStoryInput, resolveRelations);
    }
  }, []);

  return (
    <StoryContext.Provider
      value={{
        story: storyRef.current,
        setStory,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export { StoryContext, StoryProvider };
