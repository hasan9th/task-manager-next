'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "@/app/components/tasks/TaskForm";

export function AddTaskFormDialog({
  open,
  onClose,
}: {
  open:boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(open)=>{if(!open){onClose()}}} >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <TaskForm task={null} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
export default function AddNewTask() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <AddTaskFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      <Button onClick={() => setOpenDialog(true)}>Add New Task</Button>
    </div>
  );
}
