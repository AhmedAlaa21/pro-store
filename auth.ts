import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (user && user.password) {
          const isMatch = await compareSync(
            credentials.password as string,
            user.password
          );

          if (isMatch)
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
        }
        // If user does not exist or password does not match return null

        return null;
      },
    }),
  ],
};

// NextAuth v4 returns a single handler; expose GET/POST for App Router.
const handler = NextAuth(config);
export const handlers = { GET: handler, POST: handler };
export const { signIn, signOut, auth } = handler;
