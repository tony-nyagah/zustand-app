# Zustand Learning Guide for Vue/Pinia Developers

## 🎯 Core Concepts Comparison

### Store Creation

**Pinia (Vue):**

```javascript
export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [],
    filter: "all",
  }),
  getters: {
    activeTodos: (state) => state.todos.filter((t) => !t.completed),
  },
  actions: {
    addTodo(text) {
      this.todos.push({ id: Date.now(), text, completed: false });
    },
  },
});
```

**Zustand (React):**

```typescript
export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: "all",

  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),
}));
```

### Key Differences

1. **No Separate Sections**: Everything is in one object
2. **Immutable Updates**: Must use spread operators, not direct mutation
3. **No "Getters" Section**: Compute derived state in components or use selectors

## 📖 Using Stores in Components

### Pinia Pattern

```vue
<script setup>
const store = useTodoStore();
const todos = computed(() => store.todos); // Optional optimization
</script>
```

### Zustand Pattern

```typescript
// ❌ BAD - Re-renders on ANY change
const store = useTodoStore();

// ✅ GOOD - Only re-renders when todos change
const todos = useTodoStore((state) => state.todos);
const addTodo = useTodoStore((state) => state.addTodo);
```

**Why Selectors Matter:**

- Pinia: Reactive by default, Vue tracks dependencies
- Zustand: You must explicitly select what you need

## 🔧 Common Patterns

### 1. Simple State Update

**Pinia:**

```javascript
setFilter(filter) {
  this.filter = filter
}
```

**Zustand:**

```typescript
setFilter: (filter) => set({ filter });
```

### 2. Array Updates

**Pinia:**

```javascript
toggleTodo(id) {
  const todo = this.todos.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}
```

**Zustand (immutable):**

```typescript
toggleTodo: (id) =>
  set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  }));
```

### 3. Using Current State in Actions

**Pinia:**

```javascript
addMultiple() {
  const count = this.todos.length // Access with 'this'
  // ...
}
```

**Zustand:**

```typescript
addMultiple: () => {
  const count = get().todos.length; // Use get() function
  // ...
};
```

## 🔌 Middleware

### Persistence

**Pinia:**

```javascript
export const useUserStore = defineStore("user", {
  state: () => ({ username: "Guest" }),
  persist: true,
});
```

**Zustand:**

```typescript
export const useUserStore = create(
  persist((set) => ({ username: "Guest" }), { name: "user-storage" })
);
```

### DevTools

**Pinia:** Built-in with Vue DevTools

**Zustand:**

```typescript
import { devtools } from "zustand/middleware";

export const useTodoStore = create(
  devtools(
    (set) => ({
      /* state */
    }),
    { name: "TodoStore" }
  )
);
```

## 🎯 Best Practices

### 1. Selective Subscriptions (Performance)

```typescript
// ❌ AVOID - Subscribes to entire store
function TodoList() {
  const { todos, filter, addTodo } = useTodoStore();
  // Re-renders when ANYTHING changes
}

// ✅ PREFER - Subscribe only to what you need
function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const addTodo = useTodoStore((state) => state.addTodo);
  // Only re-renders when todos or filter change
}
```

### 2. Multiple Selections with Shallow

```typescript
import { shallow } from "zustand/shallow";

// Select multiple values efficiently
const { todos, filter } = useTodoStore(
  (state) => ({ todos: state.todos, filter: state.filter }),
  shallow
);
```

### 3. Derived State

**Pinia (in store):**

```javascript
getters: {
  activeTodos: (state) => state.todos.filter((t) => !t.completed);
}
```

**Zustand (in component or custom hook):**

```typescript
// Option 1: In component
const activeTodos = useTodoStore((state) =>
  state.todos.filter((t) => !t.completed)
);

// Option 2: Custom hook
export const useActiveTodos = () =>
  useTodoStore((state) => state.todos.filter((t) => !t.completed));
```

## 🚀 Advanced Patterns

### Store Composition

**Multiple stores can access each other:**

```typescript
export const useCartStore = create((set, get) => ({
  items: [],

  checkout: () => {
    const user = useUserStore.getState(); // Access other store
    console.log(`Checking out for ${user.username}`);
  },
}));
```

### Async Actions

```typescript
export const useTodoStore = create((set) => ({
  todos: [],
  isLoading: false,

  fetchTodos: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/todos");
      const todos = await response.json();
      set({ todos, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));
```

### Slices Pattern (Splitting Large Stores)

```typescript
const createTodoSlice = (set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { text }],
    })),
});

const createUserSlice = (set) => ({
  username: "Guest",
  setUsername: (name) => set({ username: name }),
});

export const useStore = create((...a) => ({
  ...createTodoSlice(...a),
  ...createUserSlice(...a),
}));
```

## 🎓 Migration Checklist

- [ ] Replace `defineStore` with `create`
- [ ] Move getters logic to components or selectors
- [ ] Change `this.state` to `set()` / `get()`
- [ ] Update all mutations to immutable updates
- [ ] Add selectors in components for performance
- [ ] Replace Pinia plugins with Zustand middleware
- [ ] Update tests (stores are just functions now!)

## 📚 Resources

- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zustand Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
- [React Query + Zustand](https://tkdodo.eu/blog/zustand-and-react-query) (for async state)

## 💡 Mental Model Shift

**Pinia:** Store is a reactive object, Vue tracks changes automatically
**Zustand:** Store is a hook, you explicitly subscribe to what you need

Think of Zustand as "composable state" rather than "reactive store"!
