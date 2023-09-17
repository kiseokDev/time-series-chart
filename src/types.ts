export type TimeSeriesEntry = {
  id: string;
  value_area: number;
  value_bar: number;
};

export type TimeSeriesData = {
  [date: string]: TimeSeriesEntry;
};

export type ChartStateType = {
  data: TimeSeriesData;
  filtered: Set<string>; // '성북구'와 같은 아이디를 기준으로 필터링 된 항목의 목록
};

export type CustomDataPoint = {
  x: string;
  y: number;
  id: string;
  value_area: number;
  value_bar: number;
};

export function isCustomDataPoint(data: unknown): data is CustomDataPoint {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  return (
    'value_area' in data &&
    typeof data.value_area === 'number' &&
    'value_bar' in data &&
    typeof data.value_bar === 'number' &&
    'id' in data &&
    typeof data.id === 'string'
  );
}
