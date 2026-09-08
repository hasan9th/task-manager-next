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
  const plan=db.sql.public.tasks.insert([{
    title:data.title,description:data.description,priority:data.priority,due_date:data.dueDate,user_id:data.userId
  }]).returning(
      "id",
      "title",
      "description",
      "completed",
      "created_at",
      "due_date",
      "priority",).build();
  const rows =await runtime.query(plan)
  
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
  const fields: string[] = [];
  const values: unknown[] = [];

  if (title !== undefined) {
    fields.push(`title=$${values.length + 1}`);
    values.push(title);
  }
  if (completed !== undefined) {
    fields.push(`completed=$${values.length + 1}`);
    values.push(completed);
  }
  if (description !== undefined) {
    fields.push(`description=$${values.length + 1}`);
    values.push(description);
  }
  if (priority !== undefined) {
    fields.push(`priority=$${values.length + 1}`);
    values.push(priority);
  }
  if (dueDate !== undefined) {
    fields.push(`due_date=$${values.length + 1}`);
    values.push(dueDate);
  }
  if (fields.length === 0) {
    return null;
  }

  values.push(id);
  const result = await pool.query<TaskRow>(
    `UPDATE tasks SET ${fields.join(", ")} where id=$${values.length} RETURNING id,title,completed,description,priority,due_date,created_at`,
    values,
  );
  const row = result.rows[0];
  return row ? mapTaskRowToTask(row) : null;
}

export async function removeTask(id: number): Promise<Task | null> {
  const result = await pool.query<TaskRow>(
    `
    DELETE FROM tasks
     WHERE id=$1
     RETURNING id,title,completed,description,priority,due_date,created_at
     `,
    [id],
  );
  const row = result.rows[0];
  return row ? mapTaskRowToTask(row) : null;
}
