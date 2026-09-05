import pool from "../db/pool.js";
import { CreateTaskInput, UpdateTaskInput } from "../schema/taskSchema.js";
import {
  mapTaskRowToTask,
  Task,
  TaskRow,
  TaskSummary,
  TaskPriority,
} from "../types/tasks.js";
import { db, runtime } from "../prisma/db.js";
import { object } from "zod";
export async function getAllTask(): Promise<Task[] | null> {
  const plan = db.sql.public.tasks
    .select(
      "id",
      "title",
      "description",
      "completed",
      "created_at",
      "due_date",
      "priority",
    )
    .build();
  const tasks = await runtime.query(plan);
  if (tasks.length === 0) {
    return null;
  }
  return tasks.map(mapTaskRowToTask);
}

export async function getATask(taskId: number): Promise<Task | null> {
  const plan = db.sql.public.tasks
    .select(
      "id",
      "title",
      "description",
      "completed",
      "created_at",
      "due_date",
      "priority",
    )
    .where((f, fns) => fns.eq(f.id, taskId))
    .build();
  const task = await runtime.query(plan);
  if (task.length === 0) {
    return null;
  }
  return mapTaskRowToTask(task[0]);
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  const plan = db.sql.public.tasks
    .insert([
      {
        title: data.title,
        description: data.description,
        priority: data.priority,
        due_date: data.dueDate,
        user_id: data.userId,
      },
    ])
    .returning(
      "id",
      "title",
      "description",
      "completed",
      "created_at",
      "due_date",
      "priority",
    )
    .build();
  const rows = await runtime.query(plan);

  if (!rows[0]) {
    throw new Error("Failed to create task");
  }
  return mapTaskRowToTask(rows[0]);
}

export async function updateTask(
  id: number,
  data: UpdateTaskInput,
): Promise<Task | null> {
  const { title, description, priority, completed, dueDate } = data;

  const updates: {
    title?: string;
    description?: string;
    completed?: boolean;
    priority?: TaskPriority;
    due_date?: string|null;
  } = {};

  if (title !== undefined) {
    updates.title = title;
  }
  if (completed !== undefined) {
    updates.completed = completed;
  }
  if (description !== undefined) {
    updates.description = description;
  }
  if (priority !== undefined) {
    updates.priority = priority;
  }
  if (dueDate !== undefined) {
    updates.due_date = dueDate;
  }
  if (Object.keys(updates).length === 0) {
    return null;
  }
  const plan = db.sql.public.tasks
    .update(updates)
    .where((f, fns) => fns.eq(f.id, id))
    .returning(
      "id",
      "title",
      "description",
      "completed",
      "created_at",
      "due_date",
      "priority",
    )
    .build();
  const rows = await runtime.query(plan);

  const row = rows[0];
  return row ? mapTaskRowToTask(row) : null;
}

export async function removeTask(id: number): Promise<number> {
  const plan=db.sql.public.tasks.delete().where((f,fns)=>fns.eq(f.id,id)).build();
  const rows=await runtime.execute(plan);
  return rows.affectedRows;
}
