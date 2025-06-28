export type AuthenticatedUser = {
  userId: number;
  username: string;
  role: 'admin' | 'viewer';
};
