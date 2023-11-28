import { useState } from "react";
import Task from "./Task";

const Tasks = ({ taskContent, onDelete, onToggle }: any) => {
  return (
    <>
      {taskContent.map((task: any, index: any) => (
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </>
  );
};

export default Tasks;
