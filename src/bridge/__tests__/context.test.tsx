import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { StoryProvider } from '../context';
import { useStory } from '../useStory';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <StoryProvider {...providerProps}>{ui}</StoryProvider>,
    renderOptions,
  );
};

const mockWindow = (storyblock) => {
  delete global.window.location;
  global.window = Object.create(window);
  global.window.storyblok = storyblock;
  global.window.location = {
    search: '?_storyblok=1&etc',
  } as any;
};

describe('[bridge] context', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render children', async () => {
    customRender(<div>children</div>, { providerProps: {} });

    expect(screen.getByText('children')).toBeDefined();
  });

  it('should init js bridge in preview mode', async () => {
    mockWindow(undefined);

    customRender(<></>, { providerProps: {} });

    const script = document.querySelector('script');
    expect(script.src).toBe('http://app.storyblok.com/f/storyblok-latest.js');

    script.parentElement.removeChild(script);
  });

  it('should not init js bridge if already loaded', async () => {
    const initMock = jest.fn();
    const onMock = jest.fn();

    mockWindow({ init: initMock, on: onMock });

    customRender(<></>, { providerProps: {} });

    const script = document.querySelector('script');
    expect(script).toBeNull();
    expect(initMock).toHaveBeenCalled();
  });

  it('should update story on input event', async () => {
    const initMock = jest.fn();
    let listener;
    const onMock = jest.fn((type, l) => {
      if (type === 'input') {
        listener = l;
      }
    });
    const addCommentsMock = jest.fn((v) => v);
    const resolveRelationsMock = jest.fn((a, b, callback) => {
      callback();
    });

    mockWindow({
      init: initMock,
      on: onMock,
      addComments: addCommentsMock,
      resolveRelations: resolveRelationsMock,
    });

    const testStory = {
      content: { uuid: '1234', title: 'old' },
      id: 'abc',
    } as any;
    const updateStory = {
      content: { uuid: '1234', title: 'new' },
      id: 'abc',
    } as any;

    const wrapper = ({ children }) => <StoryProvider>{children}</StoryProvider>;
    const { result } = renderHook(() => useStory(testStory), {
      wrapper,
    });

    expect(result.current).toBe(testStory);
    expect(initMock).toHaveBeenCalled();

    act(() => {
      listener({ story: updateStory });
    });

    expect(addCommentsMock).toHaveBeenCalledWith(
      updateStory.content,
      updateStory.id,
    );
    expect(resolveRelationsMock).toHaveBeenCalled();
    expect(result.current).toBe(updateStory);
  });

  it('should not update story on input if uuid differs', async () => {
    const initMock = jest.fn();
    let listener;
    const onMock = jest.fn((type, l) => {
      if (type === 'input') {
        listener = l;
      }
    });
    const addCommentsMock = jest.fn((v) => v);
    const resolveRelationsMock = jest.fn((a, b, callback) => {
      callback();
    });

    mockWindow({
      init: initMock,
      on: onMock,
      addComments: addCommentsMock,
      resolveRelations: resolveRelationsMock,
    });

    const testStory = {
      content: { uuid: '1234', title: 'old' },
      id: 'abc',
    } as any;
    const updateStory = {
      content: { uuid: '4567', title: 'new' },
      id: 'abc',
    } as any;

    const wrapper = ({ children }) => <StoryProvider>{children}</StoryProvider>;
    const { result } = renderHook(() => useStory(testStory), {
      wrapper,
    });

    expect(result.current).toBe(testStory);
    expect(initMock).toHaveBeenCalled();

    act(() => {
      listener({ story: updateStory });
    });

    expect(addCommentsMock).not.toHaveBeenCalledWith(
      updateStory.content,
      updateStory.id,
    );
    expect(resolveRelationsMock).not.toHaveBeenCalled();
    expect(result.current).toBe(testStory);
  });

  it('should not init (crash) if loading failed', async () => {
    mockWindow(undefined);

    customRender(<></>, { providerProps: {} });

    const script = document.querySelector('script');

    script.onload(null);
  });
});
