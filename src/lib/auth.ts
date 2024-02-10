import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  session: {
    strategy: "database",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;

        // get the user's roles
        const userRoles = await prisma.userRoles.findMany({
          select: {
            role: true,
          },
          where: {
            userId: user.id,
          },
          distinct: ["role"],
        });

        session.user.roles = userRoles.map((role) => role.role);
        session.user.username = (user as any).username;
        session.user.gender = (user as any).gender;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
