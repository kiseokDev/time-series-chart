import 'chart.js/auto';
import { Chart, getElementsAtEvent } from 'react-chartjs-2';
import { TimeSeriesData } from 'types';
import 'chartjs-adapter-moment';
import { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js';
import { useRef } from 'react';

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

  const config: ChartData<keyof ChartTypeRegistry, { x: string; y: number }[]> =
    {
      datasets: [
        {
          type: 'line' as const,
          yAxisID: 'left-y-axis',
          label: 'value_area',
          data: allDates.map(date => ({
            x: date,
            y: data[date].value_area,
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
