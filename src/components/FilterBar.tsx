import { useTodoStore } from "../stores/todoStore";

export function FilterBar() {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  // Example of using get() to access state in a computed value
  const completedCount = useTodoStore(
    (state) => state.todos.filter((t) => t.completed).length
  );

  const filters: Array<"all" | "active" | "completed"> = [
    "all",
    "active",
    "completed",
  ];

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: "bold" }}>Filter:</span>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          style={{
            padding: "8px 16px",
            background: filter === f ? "#2196F3" : "#eee",
            color: filter === f ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            textTransform: "capitalize",
          }}
        >
          {f}
        </button>
      ))}

      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          style={{
            padding: "8px 16px",
            background: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          Clear Completed ({completedCount})
        </button>
      )}
    </div>
  );
}
