// hooks/useChart.ts
import { useRecoilState } from 'recoil';
import { timeSeriesDataState, filteredDataState } from 'atoms';
import { TimeSeriesData } from 'types';

export const useChart = () => {
  const [data, setData] = useRecoilState<TimeSeriesData>(timeSeriesDataState);
  const [filtered, setFiltered] = useRecoilState(filteredDataState);

  const handleFilterById = (id: string) => {
    const filteredKeys = Object.keys(data).filter(key => data[key].id === id);
    setFiltered(new Set(filteredKeys));
  };

  return {
    data,
    filtered,
    setData,
    handleFilterById,
  };
};
