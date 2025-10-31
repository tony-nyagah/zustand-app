import { useState } from "react";
import { useTodoStore } from "../stores/todoStore";

/**
 * CALLING STORE ACTIONS
 *
 * In Pinia: store.addTodo(text)
 * In Zustand: Same thing! addTodo(text)
 */

export function TodoInput() {
  const [input, setInput] = useState("");

  // Only get the action we need - won't cause re-renders since functions are stable
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        style={{
          padding: "12px",
          fontSize: "16px",
          border: "2px solid #ddd",
          borderRadius: "4px",
          width: "300px",
          marginRight: "8px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Add Todo
      </button>
    </form>
  );
}
