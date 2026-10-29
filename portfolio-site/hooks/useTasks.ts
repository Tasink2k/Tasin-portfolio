"use client";

import { useCallback, useState } from "react";
import type { Task, TaskStatus } from "@/types";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "portfolio-task-board";

function loadInitialTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadInitialTasks);

  const persist = useCallback((next: Task[]) => {
    setTasks(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage may be unavailable (private browsing, quota) — the
      // in-memory state above still keeps the board usable for this session.
    }
  }, []);

  const addTask = useCallback(
    (title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      const task: Task = {
        id: generateId(),
        title: trimmed,
        status: "todo",
        createdAt: Date.now(),
      };
      persist([task, ...tasks]);
    },
    [tasks, persist]
  );

  const moveTask = useCallback(
    (id: string, status: TaskStatus) => {
      persist(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
    },
    [tasks, persist]
  );

  const removeTask = useCallback(
    (id: string) => {
      persist(tasks.filter((t) => t.id !== id));
    },
    [tasks, persist]
  );

  return { tasks, addTask, moveTask, removeTask };
}
