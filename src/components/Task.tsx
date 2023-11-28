import { FaTimes } from "react-icons/fa";
const Task = ({ task, onDelete, onToggle }: any) => {
  return (
    <div
      className={` task ${task.reminder && "reminder"}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <FaTimes style={btnStyle} onClick={() => onDelete(task.id)} />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

// FaTimes style
const btnStyle = {
  color: "red",
  cursor: "pointer",
  backgroundColor: "#fff",
  borderRadius: "5px",
};
export default Task;
