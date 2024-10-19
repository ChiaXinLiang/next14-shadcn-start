"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextThemesProvider attribute="class">{children}</NextThemesProvider>
    </SessionProvider>
  );
}