"use client";
import type { Task } from "@/app/types/task";
import PriorityBadge from "@/app/components/ui/PriorityBadge";
import StatusBadge from "@/app/components/ui/StatusBadge";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SetStateAction } from "react";
interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onCompletionToggle: (id: number) => void;
  onEdit:()=>void
}
export default function TaskCard({
  task,
  onCompletionToggle,
  onDelete,
  onEdit
}: TaskCardProps) {
  return (
    <Card>
      <CardContent className="">
        <div className="flex gap-1.5">
          <button
            type="button"
            aria-label="Edit task"
            className="size-6"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 />
          </button>
          <button
            type="button"
            aria-label="Edit task"
            className="size-6"
            onClick={() =>onEdit() }
          >
            <Pencil />
          </button>
        </div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>{task.dueDate}</p>
        <PriorityBadge priority={task.priority} />
        <StatusBadge completed={task.completed} />
        <button
          type="button"
          aria-label="Edit task"
          className=""
          onClick={() => onCompletionToggle(task.id)}
        >
          Toggle Completion
        </button>
        <hr />
        <Link href={`/task/${task.id}`}>View</Link>
      </CardContent>
    </Card>
  );
}
