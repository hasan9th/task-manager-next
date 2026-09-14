import TaskList from "@/app/components/tasks/TaskList";
import AddNewTask from "./components/tasks/AddNewTask";
import { TasksProvider } from "./context/taskContext";


export default function Dashboard() {
  return (
    <TasksProvider>
      <div className="flex justify-end">
        <AddNewTask />
      </div>

      <TaskList />
    </TasksProvider>
  );
}
