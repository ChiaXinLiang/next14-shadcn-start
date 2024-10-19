import { DrizzleAdapter } from "@auth/drizzle-adapter";
//@ts-expect-error
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import db from "@/db";
import { env } from "@/env/server";

const options: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  adapter: DrizzleAdapter(db),
  callbacks: {
    //@ts-expect-error
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default options;