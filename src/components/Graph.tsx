import { Chart as ChartComponent, getElementsAtEvent } from 'react-chartjs-2';
// import 'chart.js/auto';
import { TimeSeriesData } from 'types';
import 'chartjs-adapter-moment';
import { useRef } from 'react';

import {
  Title,
  Filler,
  BarController,
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
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
  handleFilterById: (id: string) => void;
}

export default function Graph({ data, selectedId, handleFilterById }: Props) {
  const chartRef = useRef(null);
  const allDates = Object.keys(data);

  const onClick: React.MouseEventHandler<HTMLCanvasElement> = e => {
    if (chartRef.current) {
      const elements = getElementsAtEvent(chartRef.current, e);
      if (elements.length > 0) {
        const firstElement = elements[0];

        // Ensure that data for the clicked date exists before accessing its properties
        const clickedDate = allDates[firstElement.index];
        if (data[clickedDate]) {
          const clickedDataId = data[clickedDate].id;
          if (clickedDataId) {
            handleFilterById(clickedDataId);
          }
        }
      }
    }
  };

  const config: ChartData<
    keyof ChartTypeRegistry,
    { x: string; y: number; id: string }[]
  > = {
    datasets: [
      {
        type: 'line' as const,
        yAxisID: 'left-y-axis',
        label: 'value_area',
        data: allDates.map(date => ({
          x: date,
          y: data[date].value_area,
          id: data[date].id,
        })),
        backgroundColor: 'rgba(230, 30, 113, 0.864)',
        borderWidth: 0,
        fill: true,
        pointRadius: 0,
        tension: 0.2,
      },
      {
        type: 'bar' as const,
        label: 'value_bar',
        yAxisID: 'right-y-axis',
        data: allDates.map(date => ({
          x: date,
          y: data[date].value_bar,
          id: data[date].id,
        })),

        backgroundColor: allDates.map(date =>
          data[date].id === selectedId ? 'darkblue' : '#69b7e8'
        ),
        borderWidth: 0,
      },
    ],
  };
  const options: ChartOptions<keyof ChartTypeRegistry> = {
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'YYYY-MM-DD HH:mm:ss',
          unit: 'second',
          displayFormats: {
            second: 'HH:mm:ss',
          },
        },
        ticks: {
          stepSize: 35,
        },
      },
      'left-y-axis': {
        type: 'linear' as const,
        position: 'left' as const,
        grid: {
          lineWidth: 2,
        },
        suggestedMin: 0,
        suggestedMax: 200,
      },
      'right-y-axis': {
        type: 'linear' as const,
        position: 'right' as const,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        displayColors: false,
        mode: 'nearest',
        intersect: false,
        callbacks: {
          title: function (tooltipItems) {
            const tooltipItem = tooltipItems[0];
            const x = tooltipItem.label || '';
            return `${x}`; // Date will serve as the title
          },
          label: function (tooltipItem) {
            const dataset = config.datasets[tooltipItem.datasetIndex];
            const currentData = dataset.data[tooltipItem.dataIndex];
            const id = currentData.id || '';
            const valueAreaDataset = config.datasets[0];
            const valueBarDataset = config.datasets[1];
            const valueArea =
              valueAreaDataset.data[tooltipItem.dataIndex].y || 0;
            const valueBar = valueBarDataset.data[tooltipItem.dataIndex].y || 0;

            return [
              `id: ${id}`,
              `${valueAreaDataset.label || ''}: ${valueArea}`,
              `${valueBarDataset.label || ''}: ${valueBar}`,
            ];
          },
        },
      },
    },
  };

  return (
    <ChartComponent
      type="bar"
      data={config}
      options={options}
      ref={chartRef}
      onClick={onClick}
    />
  );
}
