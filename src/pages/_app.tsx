import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Authentication from "~/context/auth";
import Context from "~/context";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Authentication>
        <Context>
          <Component {...pageProps} />
        </Context>
      </Authentication>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
