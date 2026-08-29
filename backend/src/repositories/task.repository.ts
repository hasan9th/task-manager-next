import pool from "../db/pool.js";
import { CreateTaskInput, UpdateTaskInput } from "../schema/taskSchema.js";
import {
  mapTaskRowToTask,
  Task,
  TaskRow,
  TaskSummary,
  TaskPriority,
} from "../types/tasks.js";

export async function getAllTask(): Promise<Task[]> {
  const result = await pool.query<TaskRow>(
    "SELECT id,title,completed,description,priority,due_date,created_at FROM tasks ORDER BY id ASC",
  );
  return result.rows.map(mapTaskRowToTask);
}
export async function getATask(id: string): Promise<Task> {
  const result = await pool.query<TaskRow>(
    "SELECT id,title,completed,description,priority,due_date,created_at FROM tasks WHERE ID=$1",
    [id],
  );
  return mapTaskRowToTask(result.rows[0]);
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  const result = await pool.query<TaskRow>(
    `
      INSERT INTO tasks (title,description,priority,due_date)
      VALUES ($1,$2,$3,$4)
      RETURNING 
        id,
        title,
        description,
        priority,
        due_date,
        completed,
        created_at
    `,
    [data.title, data.description, data.priority, data.dueDate],
  );
  return mapTaskRowToTask(result.rows[0]);
}

export async function updateTask(
  id: number,
  data: UpdateTaskInput,
): Promise<Task | null> {
  const { title, description, priority, completed,dueDate } = data;
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
  const row=result.rows[0]
  return row ?mapTaskRowToTask(row) : null;
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
   const row=result.rows[0]
  return row ? mapTaskRowToTask(row) : null;
}
