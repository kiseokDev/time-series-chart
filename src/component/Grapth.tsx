import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { TimeSeriesData } from 'types';
import 'chartjs-adapter-moment';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  Scale,
} from 'chart.js';

interface Dataset {
  yAxisID: string;
  type: 'bar' | 'line';
  label: string;
  data: { x: string; y: number }[];
  backgroundColor: string | string[];
  [key: string]: any;
}

interface Props {
  data: TimeSeriesData;
}

export function Graph({ data }: Props) {
  const filteredDates = Object.keys(data).filter(date => {
    const seconds = new Date(date).getSeconds();
    return seconds % 45 === 0;
  });

  const allDates = Object.keys(data);
  const filteredLabels = allDates.filter(date => {
    const seconds = new Date(date).getSeconds();
    return seconds % 45 === 0;
  });

  const config: ChartData<keyof ChartTypeRegistry, { x: string; y: number }[]> =
    {
      labels: allDates,
      datasets: [
        {
          type: 'line' as const,
          yAxisID: 'left-y-axis',
          label: 'value_area',
          data: allDates.map(date => ({
            x: date,
            y: data[date].value_area,
          })),
          borderColor: 'red',
          backgroundColor: 'red',
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
          })),
          backgroundColor: 'blue',
          borderColor: 'blue',
          borderWidth: 2,
        },
      ],
    };

  const options: ChartOptions<keyof ChartTypeRegistry> = {
    scales: {
      x: {
        type: 'time',
        // min: new Date(firstDate.getTime() - 1000 * 35).toISOString(),
        // max: new Date(lastDate.getTime() + 1000 * 35).toISOString(),
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
  };

  return <Chart type="bar" data={config} options={options} />;
}
