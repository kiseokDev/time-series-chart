// hooks/useChart.ts
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  // filteredDataState,
  uniqueIdsState,
  fetchedTimeSeriesDataState,
  selectedIdState,
} from 'atoms';
import { TimeSeriesData } from 'types';

export const useChart = () => {
  const data = useRecoilValue<TimeSeriesData>(fetchedTimeSeriesDataState);
  // const [filtered, setFiltered] = useRecoilState(filteredDataState);
  const uniqueIds = useRecoilValue(uniqueIdsState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  return {
    data,
    uniqueIds,
    selectedId,
    setSelectedId,
  };
};
