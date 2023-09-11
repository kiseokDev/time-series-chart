// hooks/useChart.ts
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  filteredDataState,
  uniqueIdsState,
  fetchedTimeSeriesDataState,
} from 'atoms';
import { TimeSeriesData } from 'types';

export const useChart = () => {
  const data = useRecoilValue<TimeSeriesData>(fetchedTimeSeriesDataState);
  const [filtered, setFiltered] = useRecoilState(filteredDataState);
  const uniqueIds = useRecoilValue(uniqueIdsState); // uniqueIds 값을 가져옵니다.

  const handleFilterById = (id: string) => {
    const filteredKeys = Object.keys(data).filter(key => data[key].id === id);
    setFiltered(new Set(filteredKeys));
  };

  return {
    data,
    filtered,
    uniqueIds,
    handleFilterById,
  };
};
