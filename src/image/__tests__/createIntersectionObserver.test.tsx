import React from 'react';
import { cleanup, render, act } from '@testing-library/react';

import { createIntersectionObserver } from '../createIntersectionObserver';

describe('[image] createIntersectionObserver', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should polyfill io if needed', async () => {
    const callbackMock = jest.fn();
    const component = <div id="test" />;

    act(() => {
      render(component);
    });

    createIntersectionObserver(document.querySelector('#test'), callbackMock);
  });

  it('should trigger if visible', async () => {
    const callbackMock = jest.fn();
    let callback;
    const component = <div id="test" />;

    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    const ioMock = jest.fn((cb) => {
      callback = cb;

      return {
        observe,
        unobserve,
        disconnect,
      };
    });

    window.IntersectionObserver = ioMock as any;

    act(() => {
      render(component);
    });

    const target = document.querySelector('#test');
    createIntersectionObserver(target as any, callbackMock);

    callback([{ target, isIntersecting: true }]);

    expect(callbackMock).toHaveBeenCalled();
  });

  it('should not trigger if not visible', async () => {
    const callbackMock = jest.fn();
    let callback;
    const component = <div id="test" />;

    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    const ioMock = jest.fn((cb) => {
      callback = cb;

      return {
        observe,
        unobserve,
        disconnect,
      };
    });

    window.IntersectionObserver = ioMock as any;

    act(() => {
      render(component);
    });

    const target = document.querySelector('#test');
    createIntersectionObserver(target as any, callbackMock);

    callback([
      { target: document.querySelector('body'), isIntersecting: true },
    ]);

    expect(callbackMock).not.toHaveBeenCalled();
  });

  it('should not trigger if not intersecting', async () => {
    const callbackMock = jest.fn();
    let callback;
    const component = <div id="test" />;

    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    const ioMock = jest.fn((cb) => {
      callback = cb;

      return {
        observe,
        unobserve,
        disconnect,
      };
    });

    window.IntersectionObserver = ioMock as any;

    act(() => {
      render(component);
    });

    const target = document.querySelector('#test');
    createIntersectionObserver(target as any, callbackMock);

    callback([{ target, isIntersecting: false }]);

    expect(callbackMock).not.toHaveBeenCalled();
  });

  it('should have different rootmargin based on connection speed', async () => {
    const callbackMock = jest.fn();
    const optionsMock = jest.fn();
    const component = <div id="test" />;

    const observe = jest.fn();
    const ioMock = jest.fn((_, options) => {
      optionsMock(options);

      return {
        observe,
      };
    });

    window.IntersectionObserver = ioMock as any;

    act(() => {
      render(component);
    });

    const target = document.querySelector('#test');
    createIntersectionObserver(target as any, callbackMock);

    expect(optionsMock).toHaveBeenLastCalledWith({ rootMargin: '2500px' });

    Object.defineProperty(window.navigator, 'connection', {
      value: {
        effectiveType: '4g',
      },
    });

    createIntersectionObserver(target as any, callbackMock);

    expect(optionsMock).toHaveBeenLastCalledWith({ rootMargin: '1250px' });
  });

  it('should not observe if target doesnt exist', async () => {
    const callbackMock = jest.fn();
    const component = <div id="test" />;

    act(() => {
      render(component);
    });

    const result = await createIntersectionObserver(
      document.querySelector('#notexistant'),
      callbackMock,
    );

    expect(result).toBeNull();
  });
});
