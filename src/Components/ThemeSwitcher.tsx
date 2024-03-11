"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen">
    <div>
      <h1>Theme</h1>

      {theme === "dark" ? (
        <Button
          className="bg-black w-[100px] rounded-lg border-purple-500 border-2 p-4 hover:bg-gray-200"
          onClick={() => setTheme("light")}
        >
          {" "}
         light
        </Button>
      ) : (
        <Button
          className="bg-gray-100 w-[100px] rounded-lg border-purple-500 border-2 p-4 hover:bg-gray-200"
          onClick={() => setTheme("dark")}
        >
          {" "}
          dark
        </Button>
      )}
    </div>
    </div>
  );
}
