import { atom, selector } from 'recoil';
import { getDefaultTimeSeriesData } from 'service/timeSeriesData';
import { TimeSeriesData } from 'types';
//
export const timeSeriesDataState = atom<TimeSeriesData | null>({
  key: 'timeSeriesDataState',
  default: null,
});

// 전체 데이터를 관리하는 atom
export const fetchedTimeSeriesDataState = selector<TimeSeriesData>({
  key: 'fetchedTimeSeriesDataState',
  get: async () => {
    const data = await getDefaultTimeSeriesData();
    return data;
  },
});

export const uniqueIdsState = selector<string[]>({
  key: 'uniqueIdsState',
  get: ({ get }) => {
    const timeSeriesData = get(fetchedTimeSeriesDataState);

    if (!timeSeriesData) {
      return [];
    }

    const uniqueIds = [
      ...new Set(Object.values(timeSeriesData).map(data => data.id)),
    ];
    return uniqueIds;
  },
});

// export const filteredDataState = atom({
//   key: 'filteredDataState',
//   default: new Set(),
// });

export const selectedIdState = atom<string | ''>({
  key: 'selectedIdState',
  default: '',
});
