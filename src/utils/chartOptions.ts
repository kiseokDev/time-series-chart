import { ChartOptions, ChartTypeRegistry, TooltipItem } from 'chart.js';
import { isCustomDataPoint } from 'types';

export function initOptions() {
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
        mode: 'nearest' as const,
        intersect: false,
        callbacks: {
          label: function (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) {
            if (isCustomDataPoint(tooltipItem.raw)) {
              const rawData = tooltipItem.raw;
              const { value_area, value_bar, id } = rawData;
              return [
                `id: ${String(id)}`,
                `${tooltipItem.dataset.label || ''}: ${String(value_area)}`,
                `value_bar: ${String(value_bar)}`,
              ];
            }
            return [];
          },
        },
      },
    },
  };
  return options;
}
