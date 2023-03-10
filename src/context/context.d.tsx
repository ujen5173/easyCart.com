import { type ReactNode } from "react";

export type Props = {
  children: ReactNode;
};

export type AuthContextType = {
  greetings?: string;
  status: string;
  session: {
    expires: string;
    user: User;
  } | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: string;
  emailVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
};
