import TaskList from "@/app/components/tasks/TaskList";

import TaskForm from "@/app/components/tasks/TaskForm";
import { TasksProvider } from "./context/taskContext";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export function TaskFormDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger render={<Button variant="outline">Add Task</Button>} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
                <TaskForm />

     
      
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default function Dashboard() {
  return (
    <TasksProvider>
     <TaskFormDialog/>
      <TaskList />
    </TasksProvider>
  );
}
