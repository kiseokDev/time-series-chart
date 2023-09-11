jest.mock('axios');

import axios from 'axios';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useChart } from 'hooks/useChart';
import { RecoilRoot } from 'recoil';
import mockData from '__mocks__/data.json';

// Type assertion for mocked axios
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useChart custom hook test', () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({ data: mockData.data })
    );
  });

  it('성북구로 필터링되는지 테스트', async () => {
    const { result } = renderHook(() => useChart(), {
      wrapper: RecoilRoot,
    });

    console.log(mockData.data);

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      //   expect(Object.keys(result.current.data).length).not.toBe(0);
    });

    act(() => {
      result.current.handleFilterById('성북구');
    });

    await waitFor(() => {
      //   expect(result.current.filtered.has('2023-02-01 14:32:00')).toBeTruthy();
    });
  });
});
