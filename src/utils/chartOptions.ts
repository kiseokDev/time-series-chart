import {
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  TooltipItem,
} from 'chart.js';
import { ChartataSet } from 'types';

export function initOptions(
  config: ChartData<keyof ChartTypeRegistry, ChartataSet[], unknown>
) {
  const options = {
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
          title: title,
          label: function (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) {
            const dataset = config.datasets[tooltipItem.datasetIndex];
            const currentData = dataset.data[tooltipItem.dataIndex];

            const valueAreaDataset = config.datasets[0];
            const valueBarDataset = config.datasets[1];
            const currentDataset = tooltipItem.dataset;

            const id = currentData.id || '';
            const valueArea =
              valueAreaDataset.data[tooltipItem.dataIndex].y || 0;
            const valueBar = valueBarDataset.data[tooltipItem.dataIndex].y || 0;

            // const currentData = currentDataset.data[
            //   tooltipItem.dataIndex
            // ] as unknown as ChartataSet;

            // if (typeof currentData === 'object' && currentData !== null) {
            //   const id = currentData.id || '';
            //   const valueArea = currentData.value_area || 0;
            //   const valueBar = currentData.value_bar || 0;
            //   return [
            //     `id: ${id}`,
            //     `${currentDataset.label || ''}: ${valueArea}`,
            //     `value_bar: ${valueBar}`,
            //   ];
            // }

            // return [];
            return [
              `id: ${id}`,
              `${currentDataset.label || ''}: ${valueArea}`,
              `value_bar: ${valueBar}`,
            ];
          },
        },
      },
    },
  };
  return options;
}

const title: (tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]) => string =
  function (tooltipItems) {
    if (tooltipItems.length > 0) {
      const tooltipItem = tooltipItems[0];
      const x = tooltipItem.label || '';
      return `${x}`;
    }

    return '';
  };
