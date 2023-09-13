import { ChartDataAPI } from 'api/ChartDataAPI';

export async function getDefaultTimeSeriesData() {
  const api = new ChartDataAPI();
  const data = await api.getTimeSeriesData();
  return data;
}
