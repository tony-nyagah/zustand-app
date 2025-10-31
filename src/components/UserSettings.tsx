import { useUserStore } from "../stores/userStore";

/**
 * USING PERSISTED STORE
 *
 * This store automatically saves to localStorage
 * Try changing settings, refreshing the page, and they'll persist!
 */

export function UserSettings() {
  const username = useUserStore((state) => state.username);
  const theme = useUserStore((state) => state.theme);
  const preferences = useUserStore((state) => state.preferences);
  const setUsername = useUserStore((state) => state.setUsername);
  const toggleTheme = useUserStore((state) => state.toggleTheme);
  const updatePreferences = useUserStore((state) => state.updatePreferences);
  const reset = useUserStore((state) => state.reset);

  return (
    <div
      style={{
        padding: "20px",
        background: theme === "dark" ? "#333" : "#f9f9f9",
        color: theme === "dark" ? "#fff" : "#000",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h2>User Settings (Persisted)</h2>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Username:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            width: "200px",
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 16px",
            background: theme === "dark" ? "#fff" : "#333",
            color: theme === "dark" ? "#333" : "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Toggle Theme (Current: {theme})
        </button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={preferences.showCompleted}
            onChange={(e) =>
              updatePreferences({ showCompleted: e.target.checked })
            }
            style={{ marginRight: "8px" }}
          />
          Show completed todos
        </label>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>
          Sort by:
        </label>
        <select
          value={preferences.sortBy}
          onChange={(e) =>
            updatePreferences({ sortBy: e.target.value as "date" | "name" })
          }
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        >
          <option value="date">Date</option>
          <option value="name">Name</option>
        </select>
      </div>

      <button
        onClick={reset}
        style={{
          padding: "8px 16px",
          background: "#ff6b6b",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Reset Settings
      </button>

      <p style={{ marginTop: "16px", fontSize: "14px", opacity: 0.7 }}>
        💡 Tip: Refresh the page - your settings will persist!
      </p>
    </div>
  );
}
