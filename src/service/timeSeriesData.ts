import { ChartDataAPI } from 'api/ChartDataAPI';

export async function getDefaultTimeSeriesData() {
  const api = new ChartDataAPI(); // ChartDataAPI는 실제 프로젝트에 맞게 수정
  const data = await api.getTimeSeriesData();
  return data;
}
