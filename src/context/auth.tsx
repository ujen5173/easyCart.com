import { createContext, type FC } from "react";
import { type AuthContextType, type Props } from "./context.d";
import { useSession } from "next-auth/react";

export const AuthContext = createContext({} as AuthContextType);

const Authentication: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <AuthContext.Provider
      value={{
        session,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Authentication;
