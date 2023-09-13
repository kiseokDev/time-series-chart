import { useChart } from 'hooks/useChart';
// import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';
// import { Graph } from './Grapth';
import { TestGraph } from './TestGraph';
import { useState } from 'react';
import { Graph } from './Grapth';
const TestChart = () => {
  const { data } = useChart();
  const [colorOverride, setColorOverride] = useState<
    { [key: number]: string } | undefined
  >();

  const handleChangeColor = (colorCondition: (index: number) => boolean) => {
    const newColorOverride: { [key: number]: string } = {};
    Object.values(data).forEach((_, index) => {
      if (colorCondition(index)) {
        newColorOverride[index] = 'red';
      }
    });
    setColorOverride(newColorOverride);
  };

  const handleResetColors = () => {
    setColorOverride({});
  };

  return (
    <div>
      <h1>TestChart</h1>
      <div>
        <button onClick={handleResetColors}>해체</button>
        <button onClick={() => handleChangeColor(index => index % 2 === 1)}>
          홀수
        </button>
        <button onClick={() => handleChangeColor(index => index % 2 === 0)}>
          짝수
        </button>
      </div>
      {/* <TestGraph data={data} colorOverride={colorOverride}></TestGraph> */}
      <Graph data={data}></Graph>
    </div>
  );
};

export default TestChart;
