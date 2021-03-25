import React from 'react';
import { cleanup, render, act, screen } from '@testing-library/react';

import { withStory } from '../withStory';

describe('[bridge] withStory', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should pass provided story', async () => {
    const testStory = { content: { title: '123' } } as any;

    const WrappedComponent = withStory(({ story }) => (
      <div>{story?.content?.title}</div>
    ));

    act(() => {
      render(<WrappedComponent story={testStory} />);
    });

    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.queryByText('Preview mode enabled')).toBeNull();
  });

  it('should show preview mode indicator if in preview', async () => {
    const testStory = { content: { title: '123' } } as any;

    const isInEditorMock = jest.fn(() => false);

    const WrappedComponent = withStory(({ story }: any) => (
      <div>{story?.content?.title}</div>
    ));

    window.storyblok = { isInEditor: isInEditorMock } as any;

    act(() => {
      render(
        <WrappedComponent story={testStory} __storyblok_toolkit_preview />,
      );
    });

    expect(screen.getByText('Preview mode enabled')).toBeInTheDocument();
  });
});
