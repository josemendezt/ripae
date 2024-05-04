import { InvSiteList } from './../types/inverite/Type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type InveriteState = {
  siteKeys: InvSiteList | null;
  setSiteKeys: (list: InvSiteList) => void;
};

export const useInveriteStore = create<InveriteState>()(
  devtools((set) => ({
    siteKeys: null,
    setSiteKeys: (siteList) =>
      set((state) => ({
        ...state,
        siteList,
      })),
  }))
);
