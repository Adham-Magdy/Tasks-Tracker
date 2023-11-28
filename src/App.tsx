import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import NotFound from "./components/NotFound";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { Route, Router } from "react-router-dom";
import About from "./components/About";

function App() {
  // setState for control Add form view
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskContent, setTaskContent] = useState([]);

  // Using useEffect hook to fetch data from api
  useEffect(() => {
    const getTasksFromServer = async () => {
      const tasksFromServer = await fetchData();
      setTaskContent(tasksFromServer);
    };
    getTasksFromServer();
  }, []);

  // fetch Tasks from json server
  const fetchData = async () => {
    let response = await fetch("http://localhost:5000/tasks");
    let data = await response.json();
    return data;
  };

  const fetchTask = async (id: any) => {
    let response = await fetch(`http://localhost:5000/tasks/${id}`);
    let data = await response.json();
    return data;
  };

  // Delete Task
  const deleteTask = async (id: any) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    // filtering tasks according to it's id
    setTaskContent(taskContent.filter((task) => task.id !== id));
  };

  // Handle toggle reminder
  const toggleReminder = async (id: undefined) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTaskContent(
      taskContent.map((task: undefined) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  // Adding Task
  const addTask = async (task: undefined) => {
    // adding random id's dynamically to tasks
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task };
    // setTaskContent([...taskContent, newTask]);
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    setTaskContent([...taskContent, data]);
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        title={"Task Tracker"}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      <hr style={{ marginBottom: 15, color: "steelblue" }}></hr>
      {taskContent.length > 0 ? (
        <Tasks
          taskContent={taskContent}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        />
      ) : (
        <NotFound />
      )}
      <Footer />
    </div>
  );
}

export default App;
