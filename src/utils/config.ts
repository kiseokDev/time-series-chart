import { TimeSeriesData } from 'types';

export function setChartJSConfig(chartData: TimeSeriesData) {
  {
    [
      {
        type: 'line' as const,
        yAxisID: 'left-y-axis',
        label: 'value_area',
        data: Object.keys(data).map(date => ({
          x: date,
          y: chartData[date].value_area,
        })),
        //   borderColor: 'rgb(53, 162, 235)',
        //   backgroundColor: 'rgba(247, 10, 10, 0.5)',
        borderColor: 'red',
        backgroundColor: 'red',
        fill: true,
      },
      {
        type: 'bar' as const,
        label: 'value_bar',
        yAxisID: 'right-y-axis',
        data: Object.keys(data).map(date => ({
          x: date,
          y: chartData[date].value_bar,
        })),
        //   backgroundColor: 'rgb(60, 118, 225)',
        //   borderColor: 'white',
        backgroundColor: 'blue',
        borderColor: 'blue',
        borderWidth: 2,
      },
    ];
  }
}

const data = {
  // options: options, // Place options here within the chart data
};

export default data;
