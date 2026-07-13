import { Task } from "../types/task";
interface TodoApi {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}
export async function getTasks():Promise<Task[]>{
    const response=await fetch("https://dummyjson.com/todos");
        if(!response.ok){
            throw new Error('Failed to fetch tasks');
        }
const data=await response.json();
return data.todos.map((todo: TodoApi): Task => ({
    id: todo.id.toString(),
    title: todo.todo,
    description: "---",
    priority: "medium",
    completed: todo.completed,
}));
}

export async function updateTaskApi(newTasks:Task[]) {
     const response=await fetch("https://dummyjson.com/todos/sdss");
      if(!response.ok){
            throw new Error('Failed to fetch tasks');
        }
}