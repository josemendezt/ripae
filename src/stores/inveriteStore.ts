import {
  InvSiteList,
  IDGuidData,
  BankGuidData,
} from './../types/inverite/Type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type InveriteState = {
  siteKeys: InvSiteList | null;
  setSiteKeys: (list: InvSiteList) => void;
  idGuidData: IDGuidData | null;
  setIdGuidData: (idData: IDGuidData) => void;
  bankGuidData: BankGuidData | null;
  setBankGuidData: (idData: BankGuidData) => void;
};

export const useInveriteStore = create<InveriteState>()(
  devtools((set) => ({
    siteKeys: null,
    setSiteKeys: (siteList) =>
      set((state) => ({
        ...state,
        siteList,
      })),
    idGuidData: null,
    setIdGuidData: (idGuidData) =>
      set((state) => ({
        ...state,
        idGuidData,
      })),
    bankGuidData: null,
    setBankGuidData: (bankGuidData) =>
      set((state) => ({
        ...state,
        bankGuidData,
      })),
  }))
);
