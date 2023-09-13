import { useChart } from 'hooks/useChart';
import Graph from './Graph';

const ChartComponent = () => {
  const { data, uniqueIds, handleFilterById, selectedId } = useChart();

  return (
    <div>
      <h1>Chart</h1>
      <div>
        <button
          data-testid="filter-button"
          onClick={() => handleFilterById('')}
        >
          해체
        </button>
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

      {/* <div className="App"> */}
      <Graph
        data={data}
        selectedId={selectedId}
        handleFilterById={handleFilterById}
      ></Graph>
      {/* </div> */}
    </div>
  );
};
export default ChartComponent;
