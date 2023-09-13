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
  const uniqueIds = useRecoilValue(uniqueIdsState); // uniqueIds 값을 가져옵니다.
  const [selectedId, setSelectedId] = useRecoilState(selectedIdState);

  const handleFilterById = (id: string) => {
    setSelectedId(id);
    const filteredKeys = Object.keys(data).filter(key => data[key].id === id);
    setFiltered(new Set(filteredKeys));
  };

  return {
    data,
    // filtered,
    uniqueIds,
    handleFilterById,
    selectedId,
    setSelectedId, // 이 함수도 반환하여 외부에서 사용할 수 있게 합니다.
  };
};
