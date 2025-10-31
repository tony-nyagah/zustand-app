import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * ZUSTAND MIDDLEWARE - PERSIST
 *
 * Similar to Pinia's persistence plugins
 * Automatically saves state to localStorage
 */

interface UserState {
  username: string;
  theme: "light" | "dark";
  preferences: {
    showCompleted: boolean;
    sortBy: "date" | "name";
  };

  setUsername: (username: string) => void;
  toggleTheme: () => void;
  updatePreferences: (preferences: Partial<UserState["preferences"]>) => void;
  reset: () => void;
}

const initialState = {
  username: "Guest",
  theme: "light" as const,
  preferences: {
    showCompleted: true,
    sortBy: "date" as const,
  },
};

/**
 * PERSIST MIDDLEWARE
 *
 * In Pinia: Use pinia-plugin-persistedstate
 * In Zustand: Built-in persist middleware
 *
 * This automatically saves to localStorage and restores on page load
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setUsername: (username: string) => {
        set({ username });
      },

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        }));
      },

      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        }));
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: "user-storage", // localStorage key
      // You can customize what to persist
      // partialize: (state) => ({ username: state.username }),
    }
  )
);

/**
 * MIDDLEWARE COMPARISON:
 *
 * // Pinia with persistence
 * export const useUserStore = defineStore('user', {
 *   state: () => ({ ... }),
 *   persist: true  // or with options
 * })
 *
 * // Zustand with persistence
 * export const useUserStore = create(
 *   persist(
 *     (set) => ({ ... }),
 *     { name: 'user-storage' }
 *   )
 * )
 */
