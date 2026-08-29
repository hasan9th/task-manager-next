export type TaskPriority="low"|"medium"|"high";
export interface Task{
    id:number;
    title:string;
    description:string;
    priority:TaskPriority;
    dueDate: string | null;
    completed:boolean
  createdAt: string;

}
export interface TaskRow {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  due_date: string | null;
  completed: boolean;
  created_at: Date;
}
export function mapTaskRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority,
    dueDate: row.due_date,
    completed: row.completed,
    createdAt: row.created_at.toISOString(),
  };
}
export type TaskSummary=Pick<Task,"id"|"title">;