'use client'
import type { Task } from "@/app/types/task";
import PriorityBadge from "@/app/components/ui/PriorityBadge";
import StatusBadge from "@/app/components/tasks/StatusBadge";
import  Link  from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Card,CardContent } from "@/components/ui/card";
interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
    onCompletionToggle:(id:string)=>void
}
export default function TaskCard({ task,onCompletionToggle, onDelete }: TaskCardProps) {

  return (
    <Card>
      <CardContent className="">
        <div className="flex gap-1.5">
          <button className="size-6" onClick={()=>onDelete(task.id)}><Trash2 /></button>
          <button className="size-6"><Pencil/></button>
        </div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <PriorityBadge priority={task.priority} />
        <StatusBadge status={task.status} />
        <div>{task.dueDate}</div>
        <div>{task.completed?'task is completed':'task is incomplete'}</div>
        <button onClick={()=>onCompletionToggle(task.id)}>Toggle Completion</button>
        <hr/>
        <Link href={`/tasks/${task.id}`}>View</Link>
      </CardContent>
    </Card>
  );
}
