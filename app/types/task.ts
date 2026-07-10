type TaskStatus="todo"|"done";
type TaskPriority="low"|"medium"|"high";
export interface Task{
    id:string;
    title:string;
    description:string;
    status:TaskStatus;
    priority:TaskPriority;
    dueDate?:string;
    completed:boolean

}