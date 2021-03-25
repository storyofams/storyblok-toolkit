import React from 'react';
import { cleanup } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { StoryContext, StoryProvider } from '../context';
import { useStory } from '../useStory';

describe('[bridge] useStory', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should return new story if context undefined', async () => {
    const testStory = { test: '123' } as any;
    const { result } = renderHook(() => useStory(testStory));

    expect(result.current).toBe(testStory);
  });

  it('should return context story if defined', async () => {
    const testStory = { test: '123' } as any;

    const setStoryMock = jest.fn();
    const wrapper = ({ children }) => (
      <StoryContext.Provider
        value={{
          story: testStory,
          setStory: setStoryMock,
        }}
      >
        {children}
      </StoryContext.Provider>
    );

    const { result } = renderHook(() => useStory({ test: '456' } as any), {
      wrapper,
    });

    expect(result.current).toBe(testStory);
    expect(setStoryMock).toBeCalledWith({ test: '456' });
  });

  it('should update context story if new story provided', async () => {
    const testStory = { test: '123' } as any;
    const newStory = { qwe: '456' } as any;

    const wrapper = ({ children }) => <StoryProvider>{children}</StoryProvider>;
    const { result, rerender } = renderHook(
      ({ initialValue }) => useStory(initialValue),
      {
        wrapper: wrapper as any,
        initialProps: {
          initialValue: testStory,
        },
      },
    );

    expect(result.current).toBe(testStory);

    rerender({ initialValue: newStory });

    expect(result.current).toBe(newStory);
  });
});
