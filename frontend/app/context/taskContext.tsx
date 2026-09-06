"use client";
import type { Task } from "@/app/types/task";
import { createContext, useState, useEffect } from "react";
import { updateTaskApi,getTasks,deleteTask as deleteTaskApi, createTask } from "@/app/services/taskService";
import { TaskFormData } from "../schema/taskSchema";

export interface TaskContextType {
  tasks: Task[];
  error: string | null;
  loading: boolean;
  addTask: (newTask: TaskFormData) => void;
  toggleCompletionTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export const TasksContext = createContext<TaskContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setError("Something went wrong...Failed to load tasks....");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  //Add Task
  const addTask : TaskContextType['addTask']= async(newTask) =>{
    try{
      const response=await createTask(newTask);
      if(!response){
       setTasks((prev) => [...prev, response]);
      }

    }catch(error){
      console.error("create task error",error);
      
    }
   
  }

  //Toggle completion
  const toggleCompletionTask:TaskContextType['toggleCompletionTask']=async(id)=>{
    const task =tasks.find(task=>task.id === id);
    if (!task) return
    const updatedTask = {...task,completed:!task?.completed};
    
    setTasks(prev=>
      prev.map((prTask) =>
        prTask.id === id ? updatedTask : prTask,
      ),
    );
    try {
      await updateTaskApi({completed:updatedTask.completed},updatedTask.id);
    } catch (error) {
      console.log("Update Error ...")
          setTasks(prev=>
      prev.map((prTask) =>
        prTask.id === id ? task : prTask,
      ),
    );
    }
  }

  //delete task
  const deleteTask:TaskContextType['deleteTask'] = async(id) =>{
    try {console.log("service init")
          await deleteTaskApi(Number(id));
          console.log("promise success")
          setTasks((prev) =>
      prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Delete Error",error)
    }
  }
  return (
    <TasksContext.Provider
      value={{
        tasks,
        error,
        loading,
        addTask,
        toggleCompletionTask,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
