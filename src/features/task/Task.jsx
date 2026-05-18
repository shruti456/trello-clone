import { useSelector } from "react-redux";

export default function Task({ taskId }) {
  const task = useSelector((x) => x.tasks).byId[taskId];
  return (
    <div>
      <p>{task.name}</p>
      <p>{task.description}</p>
    </div>
  );
}
