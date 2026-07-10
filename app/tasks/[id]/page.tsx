
export default function TaskDetails({id}:{id:string}) {


  // if (!task) {
  //   return <h2>Task not found</h2>;
  // }

  return (
    <div>
      <h1>{id}</h1>

      <p>
        <strong>Status:</strong> 
      </p>

      <p>
        <strong>Description:</strong> 
      </p>
    </div>
  );
}