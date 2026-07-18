type Props = {
  priority: "low" | "medium" | "high";
};
export default function PriorityBadge({ priority }: Props) {
  return <div>🩹{priority.toUpperCase()}</div>;
}
