import {
  CreateTaskInput,
  TaskQueryInput,
  UpdateTaskInput,
} from "../schema/taskSchema.js";
import { mapTaskRowToTask, Task, TaskPriority } from "../types/tasks.js";
import { db, runtime } from "../prisma/db.js";
export async function countTasks(
  userId: number,
  query: TaskQueryInput,
): Promise<number> {
  const { completed, priority,search } = query;

  const plan = db.sql.public.tasks
    .select("count", (f, fns) => fns.count())
    .where((f, fns) => {
      const conditions = [fns.eq(f.user_id, userId)];
      if (completed !== undefined) {
        conditions.push(fns.eq(f.completed, completed));
      }
      if (priority !== undefined) {
        conditions.push(fns.eq(f.priority, priority));
      }
        if (search !== undefined) {
        conditions.push(
          fns.or(
            fns.ilike(f.title, `%${search}%`),
            fns.ilike(f.description, `%${search}%`),
          )
        );
      }
      return fns.and(...conditions);
    })
    .build();
  const count = await runtime.query(plan);
  return count[0].count;
}
export async function getAllTask(
  userId: number,
  query: TaskQueryInput,
): Promise<Task[]> {
  const { page, limit, completed, priority, search,sortOrder,sortBy } = query;
  const offset = (page - 1) * limit;
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
    .where((f, fns) => {
      const conditions = [fns.eq(f.user_id, userId)];
      if (completed !== undefined) {
        conditions.push(fns.eq(f.completed, completed));
      }
      if (priority !== undefined) {
        conditions.push(fns.eq(f.priority, priority));
      }
      if (search !== undefined) {
        conditions.push(
          fns.or(
            fns.ilike(f.title, `%${search}%`),
            fns.ilike(f.description, `%${search}%`),
          )
        );
      }
      return fns.and(...conditions);
    })
    .orderBy(sortBy, { direction: sortOrder })
    .limit(limit)
    .offset(offset)
    .build();
  const tasks = await runtime.query(plan);
  return tasks.map(mapTaskRowToTask);
}

export async function getTaskById(
  taskId: number,
  userId: number,
): Promise<Task | null> {
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
    .where((f, fns) => fns.and(fns.eq(f.id, taskId), fns.eq(f.user_id, userId)))
    .build();

  const task = await runtime.query(plan);
  if (task.length === 0) {
    return null;
  }

  return mapTaskRowToTask(task[0]);
}

export async function createTask(
  data: CreateTaskInput,
  userId: number,
): Promise<Task> {
  const plan = db.sql.public.tasks
    .insert([
      {
        title: data.title,
        description: data.description,
        priority: data.priority,
        due_date: data.dueDate,
        user_id: userId,
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
  userId: number,
): Promise<Task | null> {
  const { title, description, priority, completed, dueDate } = data;

  const updates: {
    title?: string;
    description?: string;
    completed?: boolean;
    priority?: TaskPriority;
    due_date?: string | null;
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
    .where((f, fns) => fns.and(fns.eq(f.id, id), fns.eq(f.user_id, userId)))
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

export async function removeTask(id: number, userId: number): Promise<number> {
  const plan = db.sql.public.tasks
    .delete()
    .where((f, fns) => fns.and(fns.eq(f.user_id, userId), fns.eq(f.id, id)))
    .build();
  const rows = await runtime.execute(plan);
  return rows.affectedRows;
}
