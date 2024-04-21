import { User } from '@/types/user/type';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserState = {
  userStore: User | null;
  setUserStore: (user: User) => void;
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    userStore: null,
    setUserStore: (newUser) =>
      set((state) => ({
        ...state,
        userStore: { ...state.userStore, ...newUser },
      })),
  }))
);
