import { useChart } from 'hooks/useChart';

const Chart = () => {
  const { data, uniqueIds, filtered, handleFilterById } = useChart();

  return (
    <div>
      <h1>Chart</h1>
      <div>
        {uniqueIds.map(id => (
          <button
            data-testid="filter-button"
            key={id}
            onClick={() => handleFilterById(id)}
          >
            {id}
          </button>
        ))}
      </div>
      <ul>
        {Object.keys(data).map(date => {
          const chartData = data[date];
          const isFiltered = filtered.has(date);
          return (
            <li
              key={date}
              onClick={() => handleFilterById(chartData.id)}
              style={{ color: isFiltered ? 'red' : 'black' }}
            >
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
