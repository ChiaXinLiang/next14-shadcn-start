"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton({ minimal = true }: { minimal?: boolean }) {
  const { data, status } = useSession();

  if (status === "loading") {
    return <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>;
  }

  if (status === "authenticated") {
    const signOutClick = () =>
      signOut({
        callbackUrl: "/",
      });
    if (minimal) {
      return (
        <Button onClick={signOutClick} variant="ghost">
          <IconBrandGoogle className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={data.user?.image || ""} alt="User avatar" />
            <AvatarFallback>{data.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <span className="font-semibold">Signed in as</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="font-semibold">{data.user?.email}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOutClick}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/profile",
        })
      }
      variant="ghost"
    >
      <IconBrandGoogle className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
}

