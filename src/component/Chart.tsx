import { ChartDataAPI } from 'api/ChartDataAPI';
import { useEffect, useState } from 'react';
import { TimeSeriesData } from 'types';

const Chart = () => {
  const [data, setData] = useState<TimeSeriesData>({});
  useEffect(() => {
    const fetchData = async () => {
      const api = new ChartDataAPI();
      const result = await api.getTimeSeriesData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Chart</h1>
      <ul>
        {Object.keys(data).map(date => {
          const chartData = data[date];
          return (
            <li key={date}>
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
