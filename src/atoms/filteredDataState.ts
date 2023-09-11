import { atom } from 'recoil';

// 필터링된 데이터만을 관리하는 atom
export const filteredDataState = atom({
  key: 'filteredDataState',
  default: new Set(),
});
