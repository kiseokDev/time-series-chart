// hooks/useChart.ts
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  filteredDataState,
  uniqueIdsState,
  fetchedTimeSeriesDataState,
  selectedIdState,
} from 'atoms';
import { TimeSeriesData } from 'types';

export const useChart = () => {
  const data = useRecoilValue<TimeSeriesData>(fetchedTimeSeriesDataState);
  const [filtered, setFiltered] = useRecoilState(filteredDataState);
  const uniqueIds = useRecoilValue(uniqueIdsState);
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  const handleFilterById = (id: string) => {
    setSelectedId(id);
    const filteredDatas = Object.keys(data).filter(key => data[key].id === id);
    setFiltered(new Set(filteredDatas));
  };

  return {
    data,
    uniqueIds,
    handleFilterById,
    selectedId,
    setSelectedId,
  };
};
