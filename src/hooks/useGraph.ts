import { useRef } from 'react';
import { getElementsAtEvent } from 'react-chartjs-2';
import { TimeSeriesData } from 'types';

export const useGraph = (
  data: TimeSeriesData,
  //eslint-disable-next-line no-unused-vars
  handleFilterById: (id: string) => void
) => {
  const chartRef = useRef(null);

  const onClick: React.MouseEventHandler<HTMLCanvasElement> = e => {
    if (chartRef.current) {
      const elements = getElementsAtEvent(chartRef.current, e);
      if (elements.length > 0) {
        const firstElement = elements[0];

        // Ensure that data for the clicked date exists before accessing its properties
        const clickedDate = Object.keys(data)[firstElement.index];
        if (data[clickedDate]) {
          const clickedDataId = data[clickedDate].id;
          if (clickedDataId) {
            handleFilterById(clickedDataId);
          }
        }
      }
    }
  };

  return {
    chartRef,
    onClick,
  };
};
