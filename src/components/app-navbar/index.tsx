"use client"
import AuthButton from "@/components/app-navbar/auth-button";
import {
  NavigationMenu,
  NavigationMenuContent,

  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { IconPackage } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Route } from 'next';
import { ThemeSwitcher } from "./theme-switcher";

interface MenuItem {
  label: string;
  href: string;
}

export default function AppNavbar() {
  const { status } = useSession();

  const menuItems: MenuItem[] = [
    {
      label: "Home",
      href: "/",
    },

  ];

  if (status === "authenticated") {
    menuItems.push(
      {
        label: "Profile",
        href: "/profile",
      },
      {
        label: "Feedback",
        href: "/feedback",
      }
    );
  }

  return (
    <nav className="flex justify-between items-center w-full">
      <Link href="/" className="flex items-center">
        <IconPackage className="mr-2 h-6 w-6" />
        <span className="font-bold">Next.js Starter</span>
      </Link>
      <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={`${item.label}-${index}`}>
            <Link href={item.href as Route} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <ThemeSwitcher />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <AuthButton minimal={false} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </nav>

  );
}
