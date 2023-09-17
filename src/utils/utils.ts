import { TimeSeriesData } from 'types';

const extractUniqueIds = (timeSeriesData: TimeSeriesData) => [
  ...new Set(Object.values(timeSeriesData).map(data => data.id)),
];

export { extractUniqueIds };
