// Chart.test.js
import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Chart from 'component/ChartComponent';
import { getDefaultTimeSeriesData } from 'service/timeSeriesData';
import App from 'App';
import MOCKDATA from '__mocks__/data.json';
import { ChartDataAPI } from 'api/ChartDataAPI';
import axios from 'axios';

const mockedGetDefaultTimeSeriesData =
  getDefaultTimeSeriesData as jest.MockedFunction<
    typeof getDefaultTimeSeriesData
  >;

// 서비스 객체 모킹
jest.mock('service/timeSeriesData', () => ({
  getDefaultTimeSeriesData: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
  // Mock any components or functions used from react-chartjs-2
  Bar: () => null, // Mock the Bar component
  // Other mock components or functions as needed
}));
beforeEach(() => {
  mockedGetDefaultTimeSeriesData.mockClear();
});
afterEach(() => {
  jest.clearAllTimers();
});

describe('<Chart />', () => {
  it('renders uniqueIds correctly', async () => {
    mockedGetDefaultTimeSeriesData.mockResolvedValue(MOCKDATA.data);
    const { queryAllByTestId } = render(
      <RecoilRoot>
        <Suspense>
          <Chart />
        </Suspense>
      </RecoilRoot>
    );

    await waitFor(() => {
      // 버튼의 개수를 확인
      const filterButtons = queryAllByTestId('filter-button');
      expect(filterButtons.length).toBe(5);

      // 각 버튼의 텍스트를 확인
      expect(filterButtons[0].textContent).toBe('해체');
      expect(filterButtons[1].textContent).toBe('성북구');
      expect(filterButtons[2].textContent).toBe('강남구');
      expect(filterButtons[3].textContent).toBe('노원구');
      expect(filterButtons[4].textContent).toBe('중랑구');
    });
  });
});
