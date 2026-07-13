
export default function StatusBadge({completed}:{completed:boolean}){
     return <div>{completed?"Completed":"ToDo"}</div>;

}