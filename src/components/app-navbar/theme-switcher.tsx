"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useSystemTheme from "@/hooks/use-system-theme";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher({ showLabel }: { showLabel?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useSystemTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2 p-2">
      <Switch
        id="theme-switch"
        checked={theme === "light"}
        onCheckedChange={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
        color="success"
      >
        {showLabel && "Theme"}
      </Switch>
      <IconSun className="h-4 w-4 dark:hidden" />
      <IconMoon className="hidden h-4 w-4 dark:block" />
      {showLabel && (
        <Label htmlFor="theme-switch" className="sr-only">
          Toggle theme
        </Label>
      )}
    </div>
  );
}
