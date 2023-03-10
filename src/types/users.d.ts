export type User = {
  id: string;
  name: string;
  email: string;
  role: ROLE;
  profile: string;
  emailVerified: boolean;
  created_at: string | date;
  updated_at: string | date;
};

export enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
}
