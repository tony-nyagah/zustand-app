import "./App.css";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { FilterBar } from "./components/FilterBar";
import { UserSettings } from "./components/UserSettings";
import { useUserStore } from "./stores/userStore";

/**
 * ZUSTAND LEARNING APP
 *
 * This app demonstrates key Zustand concepts for Vue/Pinia developers:
 *
 * 1. Creating stores with create()
 * 2. Using stores in components with selectors
 * 3. Middleware (persist for localStorage)
 * 4. Multiple stores working together
 * 5. Performance optimization with selective subscriptions
 *
 * Key differences from Pinia:
 * - No separate getters section (just derive in components or use selectors)
 * - Use set() for updates (immutable updates)
 * - Use selectors for performance (only re-render on specific changes)
 * - Middleware wraps store creation (persist, devtools, etc.)
 */

function App() {
  const username = useUserStore((state) => state.username);
  const theme = useUserStore((state) => state.theme);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme === "dark" ? "#1a1a1a" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
        padding: "40px",
        transition: "all 0.3s",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1>Zustand Todo App</h1>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Welcome, <strong>{username}</strong>! 👋
        </p>

        <UserSettings />

        <div
          style={{
            padding: "20px",
            background: theme === "dark" ? "#2a2a2a" : "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <TodoInput />
          <FilterBar />
          <TodoList />
        </div>

        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: theme === "dark" ? "#2a2a2a" : "#e3f2fd",
            borderRadius: "8px",
          }}
        >
          <h3>📚 Zustand Concepts Demonstrated:</h3>
          <ul style={{ lineHeight: "1.8" }}>
            <li>
              <strong>Store Creation:</strong> See{" "}
              <code>src/stores/todoStore.ts</code>
            </li>
            <li>
              <strong>Selective Subscriptions:</strong> Components only
              re-render on specific state changes
            </li>
            <li>
              <strong>Persistence Middleware:</strong> User settings saved to
              localStorage
            </li>
            <li>
              <strong>Multiple Stores:</strong> Todo store + User store working
              together
            </li>
            <li>
              <strong>Immutable Updates:</strong> Using spread operators for
              state updates
            </li>
          </ul>

          <h3 style={{ marginTop: "20px" }}>🔑 Key Differences from Pinia:</h3>
          <ul style={{ lineHeight: "1.8" }}>
            <li>
              <strong>No separate getters:</strong> Compute derived state in
              components or selectors
            </li>
            <li>
              <strong>Selector pattern:</strong>{" "}
              <code>useStore(state =&gt; state.value)</code> for performance
            </li>
            <li>
              <strong>Immutable updates:</strong> Must use spread operators, not
              direct mutation
            </li>
            <li>
              <strong>Middleware wrapping:</strong> <code>persist()</code> wraps
              the store function
            </li>
          </ul>

          <p style={{ marginTop: "20px", fontStyle: "italic" }}>
            💡 Open DevTools and check localStorage to see persisted state!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
