import { createContext, useContext, useState } from "react";

const TasksContext = createContext(null);

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prev) => {
      const lastNumber = Math.max(
        0,
        ...prev.map((task) => Number(task.code.split("-")[1])),
      );
      return [
        ...prev,
        {
          ...newTask,
          id:
            newTask.id ??
            `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          code: `WF-${lastNumber + 1}`,
        },
      ];
    });
  };

  const editTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used inside TasksProvider");
  return context;
}

export default TasksProvider;
