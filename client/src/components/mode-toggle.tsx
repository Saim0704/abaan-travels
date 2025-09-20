import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300/80 backdrop-blur-sm border border-gray-400/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-700/80 dark:border-gray-500/60"
      data-testid="button-theme-toggle"
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isDark ? "translate-x-6" : "translate-x-1"
        } shadow-lg`}
      />
      <Sun className={`absolute left-1 h-3 w-3 text-yellow-500 transition-opacity ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      <Moon className={`absolute right-1 h-3 w-3 text-blue-400 transition-opacity ${isDark ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  );
}