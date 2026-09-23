import TaskList from "@/app/components/tasks/TaskList";
import AddNewTask from "@/app/components/tasks/AddNewTask";
import ProtectedRoute from "@/app/auth/protectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col ">
        <AddNewTask />
        <TaskList />
      </div>
    </ProtectedRoute>
  );
}
