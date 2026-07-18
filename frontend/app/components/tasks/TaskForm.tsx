"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "@/app/schema/taskSchema";
export default function TaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      completed: false,
    },
  });

  function onSubmit(data: TaskFormData) {
    console.log(data);
    console.log(errors);
    reset();
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
            Due Date
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
        <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </Label>
            <select
              id="status"
              {...register("status")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div>
            <Label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
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
        </Field>
        {/* Due Date & Completed (two columns) */}
        <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <Label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>
          <div className="flex items-center space-x-3 pt-1">
            <input
              id="completed"
              type="checkbox"
              {...register("completed")}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label
              htmlFor="completed"
              className="text-sm font-medium text-gray-700"
            >
              Completed
            </Label>
          </div>
        </Field>
      </FieldGroup>

      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <Button type="submit">Add Task</Button>{" "}
      </DialogFooter>
    </form>
  );
}
