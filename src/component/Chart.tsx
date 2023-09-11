import { ChartDataAPI } from 'api/ChartDataAPI';
import { filteredDataState } from 'atoms/filteredDataState';
import { timeSeriesDataState } from 'atoms/timeSeriesDataState';
import { useChart } from 'hooks/useChart';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { TimeSeriesData } from 'types';

const Chart = () => {
  const { data, filtered, setData, handleFilterById } = useChart();

  useEffect(() => {
    const fetchData = async () => {
      const api = new ChartDataAPI();
      const data = await api.getTimeSeriesData();
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Chart</h1>
      {/* 필터링 버튼 추가 */}
      <button onClick={() => handleFilterById('성북구')}>
        성북구로 필터링
      </button>
      <ul>
        {Object.keys(data).map(date => {
          const chartData = data[date];
          const isFiltered = filtered.has(date);
          return (
            <li key={date} style={{ color: isFiltered ? 'red' : 'black' }}>
              날짜: {date}, 구: {chartData.id}, 면적 값: {chartData.value_area},
              막대 값: {chartData.value_bar}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Chart;
