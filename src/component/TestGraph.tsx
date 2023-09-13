import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

import { TimeSeriesData } from 'types';
interface Dataset {
  yAxisID: string;
  type: 'bar' | 'line';
  label: string;
  data: number[];
  backgroundColor: string | string[];
  [key: string]: any;
}

export function TestGraph({
  data,
  colorOverride,
}: {
  data: TimeSeriesData;
  colorOverride?: { [key: number]: string };
}) {
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      'left-y-axis': {
        type: 'linear' as const,
        position: 'left' as const,
        grid: {
          borderDash: [8, 6],
          lineWidth: 2,
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
      'right-y-axis': {
        type: 'linear' as const,
        position: 'right' as const,
        grid: {
          display: false,
        },
        ticks: {
          callback: (
            tickValue: string | number,
            index: number,
            ticks: any[]
          ) => {
            if (typeof tickValue === 'number') {
              return String(tickValue) + '%';
            }
            return tickValue;
          },
        },
      },
    },
  };

  const config: {
    labels: string[];
    datasets: Dataset[];
  } = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        yAxisID: 'right-y-axis',
        type: 'line',
        label: 'CTR',
        borderColor: '#ba78cb',
        borderWidth: 3,
        fill: {
          target: 'origin',
          above: 'rgba(255, 0, 0, 0.5)', // Area will be red above the origin
          below: 'rgba(0, 0, 255, 0.5)', // And blue below the origin
        },
        backgroundColor: 'rgba(186, 120, 130, 0.05)',
        data: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        yAxisID: 'right-y-axis',
        type: 'line',
        label: 'CTR',
        borderColor: '#badbad',
        borderWidth: 3,
        fill: {
          target: 'origin',
          above: 'rgba(0, 0, 255, 0.5)', // Area will be blue above the origin
          below: 'rgba(255, 0, 0, 0.5)', // And red below the origin
        },
        backgroundColor: 'rgba(186, 120, 203, 0.05)',
        data: [7, 6, 5, 4, 3, 2, 1],
      },
      {
        yAxisID: 'left-y-axis',
        type: 'bar',
        label: 'Clicks',
        borderWidth: 0,
        borderRadius: 6,
        borderSkipped: false,
        backgroundColor: '#1096a5',
        data: [400, 400, 400, 400, 400, 400, 400],
        barThickness: 10,
      },
    ],
  };

  // colorOverride를 사용하여 데이터 색상을 재정의
  if (colorOverride) {
    config.datasets.forEach(dataset => {
      dataset.backgroundColor = dataset.data.map(
        (_, index) => colorOverride[index] || dataset.backgroundColor
      ) as string | string[];
    });
  }
  return <Chart type="bar" data={config} options={options} />;
}
