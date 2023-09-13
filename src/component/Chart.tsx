import { useChart } from 'hooks/useChart';
// import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';
// import { Graph } from './Grapth';
import { TestGraph } from './TestGraph';

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
      {/* <ul>
        {Object.keys(data).map(date => {
          const chartData = data[date];
          const isFiltered = filtered.has(date);
          const tooltipContent = `${chartData.id},${chartData.value_area},${chartData.value_bar}`;
          return (
            <li
              key={date}
              data-tooltip-id={`tooltip-${date}`}
              onClick={() => handleFilterById(chartData.id)}
              style={{ color: isFiltered ? 'red' : 'black' }}
            >
              날짜: {date}, 구: {chartData.id}, 면적 값: {chartData.value_area},
              막대 값: {chartData.value_bar}
              <Tooltip
                id={`tooltip-${date}`}
                content={tooltipContent}
                place="top"
              />
            </li>
          );
        })}
      </ul> */}
      {/* <Graph data={data}></Graph> */}
      <div className="App">
        <TestGraph data={data}></TestGraph>
      </div>
    </div>
  );
};
export default Chart;
