import { create } from "zustand";

/**
 * ZUSTAND STORE STRUCTURE
 *
 * Similar to Pinia, but everything is in one place:
 * - State variables (like Pinia's state)
 * - Actions (like Pinia's actions)
 * - Computed values can be derived in components (like Pinia's getters)
 */

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoState {
  // STATE - Like Pinia's state()
  todos: Todo[];
  filter: "all" | "active" | "completed";

  // ACTIONS - Like Pinia's actions
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
  clearCompleted: () => void;
}

/**
 * CREATE THE STORE
 *
 * In Pinia: defineStore('todos', { state, getters, actions })
 * In Zustand: create((set, get) => ({ state, actions }))
 *
 * - `set`: Updates state (like mutating state in Pinia)
 * - `get`: Gets current state (useful inside actions, not used in this simple example)
 */
export const useTodoStore = create<TodoState>((set) => ({
  // Initial state
  todos: [],
  filter: "all",

  // Actions
  addTodo: (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };

    // set() can take a function that receives current state
    // Similar to Pinia: this.todos.push(newTodo)
    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },

  toggleTodo: (id: number) => {
    // Update immutably (React way)
    // In Pinia: this.todos.find(t => t.id === id).completed = !completed
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  deleteTodo: (id: number) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  setFilter: (filter: "all" | "active" | "completed") => {
    // Simple state update
    set({ filter });
  },

  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    }));
  },
}));

/**
 * COMPARISON WITH PINIA:
 *
 * // Pinia (Vue)
 * export const useTodoStore = defineStore('todos', {
 *   state: () => ({
 *     todos: [],
 *     filter: 'all'
 *   }),
 *   getters: {
 *     filteredTodos: (state) => { ... }
 *   },
 *   actions: {
 *     addTodo(text) { this.todos.push(...) }
 *   }
 * })
 *
 * // Zustand (React)
 * export const useTodoStore = create((set, get) => ({
 *   todos: [],
 *   filter: 'all',
 *   addTodo: (text) => set((state) => ({ todos: [...state.todos, ...] }))
 * }))
 */
