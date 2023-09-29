"use client";

// To access user from the fe
// Making a client component to do so
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

// Placing it in the root layout gives us access to the user anywhere in the client side application
export default function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}