import { useEffect, useState } from "react";
import type { Task } from "../types/task";

const defaultTasks: Task[] = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Practice TypeScript", completed: true },
  { id: 3, title: "Build Task App", completed: false },
];

function useLocalStorageTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return { tasks, setTasks };
}

export default useLocalStorageTasks;