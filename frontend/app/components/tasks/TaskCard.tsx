'use client';

import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';

import type { Task } from '@/app/types/task';
import PriorityBadge from '@/app/components/ui/PriorityBadge';
import StatusBadge from '@/app/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onCompletionToggle: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function TaskCard({
  task,
  onDelete,
  onCompletionToggle,
  onEdit,
}: TaskCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-xl border-[#E8E8EC] bg-[#FFFFFF] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <CardTitle className="min-w-0 truncate text-xl font-bold tracking-[-0.03em] text-[#0A0A0A]">
          {task.title}
        </CardTitle>

        <div className="flex shrink-0 gap-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              title="Edit task"
              aria-label="Edit task"
              onClick={() => onEdit(task.id)}
              className="size-8 text-[#6B6B6B] hover:-translate-y-px hover:bg-[#F4F4FF] hover:text-[#6366F1]"
            >
              <Pencil className="size-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            title="Delete task"
            aria-label="Delete task"
            onClick={() => onDelete(task.id)}
            className="size-8 text-[#6B6B6B] hover:-translate-y-px hover:bg-red-50 hover:text-[#EF4444]"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5">
        <p className="line-clamp-3 min-h-[72px] text-[15px] leading-6 text-[#6B6B6B]">
          {task.description || 'No description added.'}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <StatusBadge completed={task.completed} />
        </div>

        <Button
          type="button"
          variant={task.completed ? 'outline' : 'default'}
          onClick={() => onCompletionToggle(task.id)}
          className="mt-auto w-full"
        >
          {task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        </Button>
      </CardContent>

      <CardFooter className="border-t border-[#E8E8EC] bg-[#FAFAFA] px-6 py-3">
        <Button variant="ghost" className="ml-auto text-[#6366F1] hover:text-[#4F46E5]">
          <Link href={`/task/${task.id}`}>View task</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
