import React, { ComponentType, ReactNode, useEffect, useState } from 'react';

import { Story } from '../story';

import { useStory } from './useStory';

export interface WithStoryProps {
  story: Story;
}

export const withStory = <T extends WithStoryProps = WithStoryProps>(
  WrappedComponent: ComponentType<T>,
) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const Component = ({ story: providedStory, ...props }: T) => {
    const story = useStory(providedStory);

    const [isPreview, setPreview] = useState(false);
    let previewMode: ReactNode = null;

    useEffect(() => {
      if (
        (props as any)?.__storyblok_toolkit_preview &&
        typeof window !== 'undefined' &&
        window.storyblok &&
        !window.storyblok.isInEditor()
      ) {
        setPreview(true);
      }
    }, []);

    if (isPreview) {
      previewMode = (
        <div
          id="storyblok-toolkit-preview"
          style={{
            position: 'fixed',
            left: '32px',
            bottom: '32px',
            maxWidth: '100%',
            padding: '24px',
            borderRadius: '8px',
            backgroundColor: '#111',
            color: '#fff',
            boxShadow: '0px 12px 24px rgb(102, 102, 102, 0.25)',
            zIndex: 9999999,
          }}
        >
          <div
            style={{
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            Preview mode enabled
          </div>
          <a href="/api/preview/clear" style={{ color: '#fff' }}>
            Exit preview
          </a>
        </div>
      );
    }

    return (
      <>
        {previewMode}
        <WrappedComponent {...(props as T)} story={story} />
      </>
    );
  };

  Component.displayName = `withStory(${displayName})`;

  return Component;
};
