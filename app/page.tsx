import TaskList from "@/app/components/tasks/TaskList";

import TaskForm from "@/app/components/tasks/TaskForm";
import { TasksProvider } from "./context/taskContext";
export default function Dashboard() {
  return (
    <TasksProvider>
      {/* <div className="relative top-0 left-0 w-full h-full bg-amber-200 bg-opacity-5 font-black text-3xl">
        Loading...
      </div> */}
      <TaskForm />
      <TaskList />
    </TasksProvider>
  );
}
