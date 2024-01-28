export type UserProfile = 'investor' | 'borrower';

export type User = {
  // we will have more props in the future
  profile: UserProfile;
};
