import 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Chart } from 'react-chartjs-2';
import { TimeSeriesData } from 'types';
import { ChartOptions, ChartTypeRegistry } from 'chart.js';
import { useGraph } from 'hooks/useGraph';
import { initConfig } from 'utils/chartConfig';
import { initOptions } from 'utils/chartOptions';

interface Props {
  data: TimeSeriesData;
  selectedId: string | null;
  handleFilterById: (id: string) => void;
}

export default function TestGraph({
  data,
  selectedId,
  handleFilterById,
}: Props) {
  const { onClick, chartRef } = useGraph(data, handleFilterById);

  // const config = initConfig(data, selectedId);
  // const options = initOptions(config);

  const config = {
    datasets: [
      {
        type: 'line' as const,
        yAxisID: 'left-y-axis',
        label: 'value_area',
        data: Object.keys(data).map(date => ({
          x: date,
          y: data[date].value_area,
          id: data[date].id,
          value_area: data[date].value_area,
          value_bar: data[date].value_bar,
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
        data: Object.keys(data).map(date => ({
          x: date,
          y: data[date].value_bar,
          id: data[date].id,
          value_area: data[date].value_area,
          value_bar: data[date].value_bar,
        })),

        backgroundColor: Object.keys(data).map(date =>
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
            return `${x}`;
          },
          label: function (tooltipItems) {
            const valueAreaDataset = config.datasets[0];
            const valueBarDataset = config.datasets[1];
            const dataset =
              config.datasets[tooltipItems.datasetIndex].data[
                tooltipItems.dataIndex
              ];
            const currentDataset = tooltipItems.dataset;

            if (typeof dataset === 'object' && dataset !== null) {
              const id = dataset.id || '';
              const valueArea =
                valueAreaDataset.data[tooltipItems.dataIndex].y || 0;
              const valueBar =
                valueBarDataset.data[tooltipItems.dataIndex].y || 0;
              return [
                `id: ${id}`,
                `${currentDataset.label || ''}: ${valueArea}`,
                `value_bar: ${valueBar}`,
              ];
            }

            return [];
          },
        },
      },
    },
  };

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
