import { InvSiteList } from './../types/inverite/Type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type InveriteState = {
  siteList: InvSiteList | null;
  setSiteList: (list: InvSiteList) => void;
};

export const useInveriteStore = create<InveriteState>()(
  devtools((set) => ({
    siteList: null,
    setSiteList: (siteList) =>
      set((state) => ({
        ...state,
        siteList,
      })),
  }))
);
