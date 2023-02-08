import { atom, atomFamily, selector } from "recoil";
import { getUser } from "../core/rest.api";

export interface PageInfo {
  page: number,
  results: number
}

export const defaultPageInfo: PageInfo = {
  page: 1,
  results: 10,
};

export const userTableState = atom<PageInfo>({
  key: 'userTableState',
  default: { ...defaultPageInfo }
})

export const userTableSelector = selector({
  key: 'userTableSelector',
  get: async ({ get }) => {
    let params = get(userTableState)
    let pageData = await getUser(params.page, params.results)
    return pageData
  },
  set: ({set}, newValue) => set(userTableState, newValue),
})