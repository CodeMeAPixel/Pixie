import { compare } from 'bcrypt-ts';
import NextAuth, { type Session, DefaultUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { getUser } from '@/lib/db/queries';

import { authConfig } from './auth.config';
import { DUMMY_PASSWORD } from '@/lib/constants';

// Extended user interface
interface ExtendedUser extends DefaultUser {
  id: string;
  username?: string;
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  profilePictureUrl?: string;
  isAdmin?: boolean;
  isBeta?: boolean;
  isPremium?: boolean;
  isBanned?: boolean;
  github?: string;
  twitter?: string;
  linkedin?: string;
  theme?: string;
  language?: string;
  timezone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const users = await getUser(email);

        if (users.length === 0) {
          await compare(password, DUMMY_PASSWORD);
          return null;
        }

        const [user] = users;

        if (!user.password) {
          await compare(password, DUMMY_PASSWORD);
          return null;
        }

        const passwordsMatch = await compare(password, user.password);

        if (!passwordsMatch) return null;

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
          createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
          updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
          lastLoginAt: user.lastLoginAt ? new Date(user.lastLoginAt) : undefined
        };
      }
      return token;
    },
    async session({ session, token }: { session: ExtendedSession; token: any }) {
      if (session.user) {
        session.user = {
          ...session.user,
          ...token,
          // Remove any sensitive data
          password: undefined
        };
      }
      return session;
    },
  },
});

// Export the extended types
declare module 'next-auth' {
  interface User extends ExtendedUser {}
  interface Session extends ExtendedSession {}
}
