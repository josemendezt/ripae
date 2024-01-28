import { User, UserProfile } from '@/types/user';
import { create } from 'zustand';

type UserState = {
  user: User;
  setUserProfile: (profile: UserProfile) => void;
  getUserProfile: () => UserProfile;
  getUser: () => User;
};

const useUserStore = create<UserState>((set, get) => ({
  user: { profile: 'investor' },
  setUserProfile: (profile) =>
    set((state) => ({ user: { ...state.user, profile } })),
  getUserProfile: () => get().user.profile,
  getUser: () => get().user,
}));

export default useUserStore;
