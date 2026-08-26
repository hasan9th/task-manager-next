import { push } from "node:stream/iter";
import pool from "../db/pool.js";
import { Task } from "../types/tasks.js";

export async function getAllTask(): Promise<Task[]> {
  const result = await pool.query<Task>(
    "SELECT id,title,completed,description,priority FROM tasks ORDER BY id ASC",
  );
  return result.rows;
}
export async function getATask(id: string): Promise<Task> {
  const result = await pool.query<Task>(
    "SELECT id,title,completed FROM tasks WHERE ID=$1",
    [id],
  );
  return result.rows[0];
}

export async function createTask(title: string) {
  const result = await pool.query(
    `
      INSERT INTO tasks (title)
      VALUES ($1)
      RETURNING id,title,completed,created_at
    `,
    [title],
  );
  return result.rows[0];
}

export async function updateTask(
  id: number,
  title: string | undefined,
  completed: boolean | undefined,
): Promise<Task | null> {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (title !== undefined) {
    fields.push("title=$" + values.length + 1);
    values.push(title);
  }
  if (completed !== undefined) {
    fields.push("completed=$" + values.length + 1);
    values.push(completed);
  }

  if (fields.length === 0) {
    return null;
  }
  values.push(id);

  console.log(
    `UPDATE tasks SET ${fields.join(", ")} where id=$${values.length} RETURN id,title,completed,description`,
    values,
  );
  const result = await pool.query<Task>(
    `UPDATE tasks SET ${fields.join(", ")} where id=$${values.length} RETURNING id,title,completed,description`,
    values,
  );

  return result?.rows[0] ?? null;
}
