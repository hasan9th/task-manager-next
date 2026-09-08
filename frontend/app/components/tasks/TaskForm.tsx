"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "@/app/schema/taskSchema";
import { useTask } from "@/app/hooks/useTask";
import { Task } from "@/app/types/task";
import { JSX } from "react/jsx-runtime";
export default function TaskForm({ task,onClose }: { task: Task | null;onClose:()=>void }): JSX.Element {
  const { addTask, updateTask } = useTask();
  const defaultValues: TaskFormData = {
    title: "",
    description: "",
    priority: "medium",
    completed: false,
    dueDate: null,
    userId: 1,
  };
  if (task !== null) {
    ((defaultValues.title = task.title),
      (defaultValues.description = task.description),
      (defaultValues.priority = task.priority),
      (defaultValues.completed = task.completed));
    defaultValues.dueDate = task.dueDate;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  function onSubmit(data: TaskFormData) {
    {
      task !== null ? updateTask(data, task.id) : addTask(data);
    }
    reset();
    onClose();

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <FieldGroup>
        <Field>
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter task title"
            {...register("title", { required: true })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </Field>
        {/* Description */}
        <Field>
          <Label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <textarea
            id="description"
            rows={3}
            {...register("description")}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </Field>
        {/* Status & Priority (two columns) */}
        <Field className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priorities
            </Label>
            <select
              id="priority"
              {...register("priority")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <Label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              Users
            </Label>
            <select
              id="userId"
              {...register("userId", { valueAsNumber: true })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="1">Peter</option>
              <option value="2">Lily</option>
              <option value="3">Hesai</option>
            </select>
            {errors.userId && (
              <p className="text-red-500 text-sm">{errors.userId.message}</p>
            )}
          </div>
          <div>
            <Label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </Label>
            <input
            type="date"
              id="dueDate" 
              {...register("dueDate", { valueAsDate: false })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />

            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>
        </Field>
      </FieldGroup>

      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        {task !== null ? (
          <Button type="submit">UpdateTask</Button>
        ) : (
          <Button type="submit">Add Task</Button>
        )}
      </DialogFooter>
    </form>
  );
}
