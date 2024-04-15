import { User } from '@/types/user/type';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (newUser) =>
          set((state) => ({
            ...state,
            user: { ...state.user, ...newUser },
          })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);
