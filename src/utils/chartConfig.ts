import { ChartData, ChartTypeRegistry } from 'chart.js';
import { ChartataSet, TimeSeriesData } from 'types';

export function initConfig(data: TimeSeriesData, selectedId: string | null) {
  const config: ChartData<keyof ChartTypeRegistry, ChartataSet[]> = {
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

  return config;
}
