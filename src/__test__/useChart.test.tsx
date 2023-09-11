// Chart.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { getDefaultTimeSeriesData } from 'service/timeSeriesData';
import App from 'App';
import MOCKDATA from '__mocks__/data.json';

const mockedGetDefaultTimeSeriesData =
  getDefaultTimeSeriesData as jest.MockedFunction<
    typeof getDefaultTimeSeriesData
  >;

// 서비스 객체 모킹
jest.mock('service/timeSeriesData', () => ({
  getDefaultTimeSeriesData: jest.fn(),
}));

describe('<Chart />', () => {
  beforeEach(() => {
    mockedGetDefaultTimeSeriesData.mockClear();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders uniqueIds correctly', async () => {
    mockedGetDefaultTimeSeriesData.mockResolvedValue(MOCKDATA.data);

    const { queryAllByTestId } = render(<App />);

    await waitFor(() => {
      // 버튼의 개수를 확인
      const filterButtons = queryAllByTestId('filter-button');
      expect(filterButtons.length).toBe(4);

      // 각 버튼의 텍스트를 확인
      expect(filterButtons[0].textContent).toBe('성북구');
      expect(filterButtons[1].textContent).toBe('강남구');
      expect(filterButtons[2].textContent).toBe('노원구');
      expect(filterButtons[3].textContent).toBe('중랑구');
    });
  });
});
