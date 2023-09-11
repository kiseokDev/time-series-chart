export type TimeSeriesEntry = {
  id: string;
  value_area: number;
  value_bar: number;
};

export type TimeSeriesData = {
  [date: string]: TimeSeriesEntry;
};
