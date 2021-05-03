import * as React from 'react';
import { cleanup, waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useImageLoader } from '../helpers';

const currentTarget = document.createElement('img');
currentTarget.src = 'test';
const event = { currentTarget } as any;

describe('[bridge] helpers: useImageLoader', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should load image on load', async () => {
    const setLoadedMock = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [false, setLoadedMock]);

    jest.spyOn(global, 'Image').mockImplementation(() => ({} as any));

    const { result } = renderHook(() => useImageLoader());

    await act(async () => {
      result.current.onLoad(event);

      await waitFor(() => expect(result.current.isLoaded).toBeTruthy());
    });
  });

  it('should decode image on load if needed', async () => {
    const setLoadedMock = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [false, setLoadedMock]);

    jest.spyOn(global, 'Image').mockImplementation(
      () =>
        ({
          decode: () =>
            new Promise<void>((resolve) => {
              resolve();
            }),
        } as any),
    );

    const { result } = renderHook(() => useImageLoader());

    await act(async () => {
      result.current.onLoad(event);

      await waitFor(() => expect(result.current.isLoaded).toBeTruthy());
    });
  });

  it('should not load image if already loaded', async () => {
    const imgMock = jest.fn(() => ({} as any));
    jest.spyOn(global, 'Image').mockImplementation(imgMock);

    const { result } = renderHook(() => useImageLoader());

    await act(async () => {
      result.current.setLoaded(true);

      await waitFor(() => expect(result.current.isLoaded).toBeTruthy());

      result.current.onLoad(event);

      expect(imgMock).not.toHaveBeenCalled();
    });
  });
});
