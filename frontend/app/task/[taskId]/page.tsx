import { getTaskById } from "@/app/services/taskService";
import { notFound } from "next/navigation";
export default async function TaskDetails({
  params,
}: {
  params: Promise<{ taskId: number }>;
}) {
  const { taskId } = await params;


  const task = await getTaskById(taskId);

  if (!task) {
    notFound();
  }
  return (
    <div>
      <h1>id:{taskId}</h1>

      <p>
        <strong>Title:</strong> {task.title}
      </p>
    
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
    </div>
  );
}
