import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import FilterButtons from 'components/FilterButtons';
import MOCKDATA from '__mocks__/data.json';
import { getDefaultTimeSeriesData } from 'service/timeSeriesData';
import { extractUniqueIds } from 'utils/utils';
import { act } from 'react-dom/test-utils';

// const mockedGetDefaultTimeSeriesData =
//   getDefaultTimeSeriesData as jest.MockedFunction<
//     typeof getDefaultTimeSeriesData
//   >;

// jest.mock('service/timeSeriesData', () => ({
//   getDefaultTimeSeriesData: jest.fn(),
// }));

// beforeEach(() => {
//   mockedGetDefaultTimeSeriesData.mockClear();
// });

// afterEach(() => {
//   cleanup();
//   jest.clearAllTimers();
// });

describe('<FilterButtons /> 테스트', () => {
  it('uniqueIds렌더링 한다', async () => {
    // mockedGetDefaultTimeSeriesData.mockResolvedValue(MOCKDATA.data);
    const uiqueIds = extractUniqueIds(MOCKDATA.data);

    const { queryAllByTestId } = render(
      <FilterButtons uniqueIds={uiqueIds} handleFilterById={jest.fn()} />
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
  // it('버튼을 클리하면 handleFilterById가 id와 함께 작동한다', async () => {
  //   const uiqueIds = extractUniqueIds(MOCKDATA.data);
  //   const mockHandler = jest.fn();

  //   const { getByText } = render(
  //     <FilterButtons uniqueIds={uiqueIds} handleFilterById={mockHandler} />
  //   );

  //   const button = getByText('해체');
  //   await act(async () => {
  //     fireEvent.click(button);
  //   });

  //   expect(mockHandler).toHaveBeenCalledWith('해체');
  // });
});
