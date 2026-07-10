type Props={
    status:"todo"|"in_progress"|"done";
}
export default function StatusBadge({status}:Props){
     return <div>{status}</div>;

}