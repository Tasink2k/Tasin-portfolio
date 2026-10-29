"use client";

import { FormEvent, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Task, TaskStatus } from "@/types";

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "todo", label: "To do" },
  { id: "in-progress", label: "In progress" },
  { id: "done", label: "Done" },
];

function nextStatus(status: TaskStatus): TaskStatus | null {
  if (status === "todo") return "in-progress";
  if (status === "in-progress") return "done";
  return null;
}

function prevStatus(status: TaskStatus): TaskStatus | null {
  if (status === "done") return "in-progress";
  if (status === "in-progress") return "todo";
  return null;
}

function TaskCard({
  task,
  onAdvance,
  onRetreat,
  onRemove,
}: {
  task: Task;
  onAdvance: () => void;
  onRetreat: () => void;
  onRemove: () => void;
}) {
  const forward = nextStatus(task.status);
  const backward = prevStatus(task.status);

  return (
    <li className="rounded-md border border-border bg-surface-raised p-3">
      <p className="text-sm text-ink">{task.title}</p>
      <div className="mt-2 flex gap-2">
        {backward && (
          <button
            type="button"
            onClick={onRetreat}
            className="text-xs text-muted hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
            aria-label={`Move "${task.title}" back`}
          >
            ← back
          </button>
        )}
        {forward && (
          <button
            type="button"
            onClick={onAdvance}
            className="text-xs text-amber hover:text-amber-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
            aria-label={`Move "${task.title}" forward`}
          >
            forward →
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="ml-auto text-xs text-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
          aria-label={`Remove "${task.title}"`}
        >
          remove
        </button>
      </div>
    </li>
  );
}

export function TaskBoard() {
  const { tasks, addTask, moveTask, removeTask } = useTasks();
  const [draft, setDraft] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addTask(draft);
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="new-task" className="sr-only">
          New task title
        </label>
        <input
          id="new-task"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a task…"
          className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        />
        <Button type="submit" disabled={!draft.trim()}>
          Add
        </Button>
      </form>

      <div className="grid gap-4 sm:grid-cols-3">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);
          return (
            <Card key={column.id} className="min-h-[180px]">
              <p className="mb-3 text-xs text-muted">
                {column.label} · {columnTasks.length}
              </p>
              {columnTasks.length === 0 ? (
                <p className="text-xs italic text-muted">
                  {column.id === "todo" ? "Add a task above to get started." : "Nothing here yet."}
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onAdvance={() => {
                        const next = nextStatus(task.status);
                        if (next) moveTask(task.id, next);
                      }}
                      onRetreat={() => {
                        const prev = prevStatus(task.status);
                        if (prev) moveTask(task.id, prev);
                      }}
                      onRemove={() => removeTask(task.id)}
                    />
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
