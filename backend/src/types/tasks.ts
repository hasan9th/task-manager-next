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
  priority: string;
  due_date: string | null;
  completed: boolean;
  created_at: string;
}
function mapPriority(priority: string): TaskPriority {
  if (
    priority === "low" ||
    priority === "medium" ||
    priority === "high"
  ) {
    return priority;
  }

  throw new Error(`Invalid task priority: ${priority}`);
}
export function mapTaskRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: mapPriority(row.priority),
    dueDate: row.due_date??null,
    completed: row.completed,
    createdAt: row.created_at,
  };
}
export type TaskSummary=Pick<Task,"id"|"title">;