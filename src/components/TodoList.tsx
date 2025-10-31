import { useTodoStore } from "../stores/todoStore";
import { useUserStore } from "../stores/userStore";

/**
 * USING ZUSTAND IN COMPONENTS
 *
 * Three ways to use stores:
 * 1. Select entire store (re-renders on any change)
 * 2. Select specific state (re-renders only when that state changes) ⭐ RECOMMENDED
 * 3. Select multiple states with a selector function
 */

export function TodoList() {
  /**
   * METHOD 1: Get everything (not recommended - causes unnecessary re-renders)
   * const { todos, toggleTodo, deleteTodo } = useTodoStore();
   *
   * This is like: const store = useTodoStore(); in Pinia
   * Problem: Component re-renders even if only filter changes
   */

  /**
   * METHOD 2: Select specific state ⭐ BEST PRACTICE
   * Only re-renders when these specific values change
   *
   * In Pinia: const todos = computed(() => store.todos)
   * In Zustand: const todos = useTodoStore(state => state.todos)
   */
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  // Get user preferences from another store
  const showCompleted = useUserStore(
    (state) => state.preferences.showCompleted
  );

  /**
   * COMPUTED VALUES / GETTERS
   *
   * In Pinia: You'd define getters in the store
   * In Zustand: Just compute them in the component or use a selector
   */
  const filteredTodos = todos.filter((todo) => {
    if (!showCompleted && todo.completed) return false;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="todo-list">
      <h2>Todos ({filteredTodos.length})</h2>

      {filteredTodos.length === 0 ? (
        <p style={{ color: "#888", fontStyle: "italic" }}>
          No todos yet. Add one above!
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                padding: "12px",
                marginBottom: "8px",
                background: "#f5f5f5",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ width: "18px", height: "18px", cursor: "pointer" }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#888" : "#000",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * PERFORMANCE TIP:
 *
 * // ❌ BAD - Re-renders on ANY store change
 * const store = useTodoStore();
 *
 * // ✅ GOOD - Only re-renders when todos change
 * const todos = useTodoStore(state => state.todos);
 *
 * // ✅ GOOD - Select multiple with custom equality
 * const { todos, filter } = useTodoStore(
 *   state => ({ todos: state.todos, filter: state.filter }),
 *   shallow // from 'zustand/shallow'
 * );
 */
