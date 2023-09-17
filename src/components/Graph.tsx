import { Chart } from 'react-chartjs-2';
import { TimeSeriesData } from 'types';
import 'chartjs-adapter-moment';

import {
  Title,
  Filler,
  BarController,
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Tooltip,
  TimeScale,
} from 'chart.js';
import { useGraph } from 'hooks/useGraph';
import { initConfig } from 'utils/chartConfig';
import { initOptions } from 'utils/chartOptions';

// Register your components
ChartJS.register(
  Title,
  Filler,
  BarController,
  TimeScale,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

interface Props {
  data: TimeSeriesData;
  selectedId: string | null;
  //eslint-disable-next-line no-unused-vars
  handleFilterById: (id: string) => void;
}

export default function TestGraph({
  data,
  selectedId,
  handleFilterById,
}: Props) {
  const { onClick, chartRef } = useGraph(data, handleFilterById);
  const config = initConfig(data, selectedId);
  const options = initOptions();

  return (
    <Chart
      type="bar"
      data={config}
      options={options}
      ref={chartRef}
      onClick={onClick}
    />
  );
}
