import { atom } from 'recoil';
import { TimeSeriesData } from 'types';

// 전체 데이터를 관리하는 atom
export const timeSeriesDataState = atom<TimeSeriesData>({
  key: 'timeSeriesDataState',
  default: {},
});
