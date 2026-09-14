"use client";
import type { Task } from "@/app/types/task";
import PriorityBadge from "@/app/components/ui/PriorityBadge";
import StatusBadge from "@/app/components/ui/StatusBadge";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onCompletionToggle: (id: number) => void;
  onEdit: () => void;
}
export default function TaskCard({
  task,
  onCompletionToggle,
  onDelete,
  onEdit,
}: TaskCardProps) {
  return (
    <Card>
      <CardContent className="">
        <div className="flex gap-1.5">
          <Button
            variant={"outline"}
            size={"icon-lg"}
            type="button"
            aria-label="Edit task"
            className="size-6"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 />
          </Button>
          <Button
            variant={"outline"}
            size={"icon-lg"}
            type="button"
            aria-label="Edit task"
            className="size-6"
            onClick={() => onEdit()}
          >
            <Pencil />
          </Button>
        </div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>{task.dueDate}</p>
        <PriorityBadge priority={task.priority} />
        <StatusBadge completed={task.completed} />
        <Button
          variant={"secondary"}
          size={"default"}
          type="button"
          aria-label="Edit task"
          className=""
          onClick={() => onCompletionToggle(task.id)}
        >
          Toggle Completion
        </Button>
      </CardContent>

      <CardFooter className="">
        <Button
          variant="ghost"
          className="ml-auto text-[#6366F1] hover:text-[#4F46E5]"
        >
          <Link href={`/task/${task.id}`}>View task</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
