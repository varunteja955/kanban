import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Safe state initializer
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("kanban_tasks");
      return savedTasks ? JSON.parse(savedTasks) : [
        { id: 1, title: "learn react state", status: "todo" }
      ];
    } catch (error) {
      return [{ id: 1, title: "learn react state", status: "todo" }];
    }
  });

  const [taskInput, setTaskInput] = useState("");

  // Safe save mechanism
  useEffect(() => {
    try {
      localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Storage error:", error);
    }
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: taskInput,
      status: "todo"
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div className="heading" style={{ textAlign: 'center' }}>
        <h1> KANBAN </h1>
      </div>

      <form onSubmit={handleAddTask}>
        <input 
          type="text" 
          value={taskInput} 
          onChange={(e) => setTaskInput(e.target.value)} 
          placeholder="Type a new task..."
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Add Task</button>
      </form>

      <div className="hero">
        
        {/* === TODO COLUMN === */}
        <div className="outer-box1">
          <h2>TODO</h2>
          {tasks.filter(task => task.status === "todo").map(task => (
            <div key={task.id} className="inner-box" >
              <h4>{task.title}</h4>
              <button onClick={() => moveTask(task.id, "inprogress")}>next &rarr;</button>
            </div>
          ))}
        </div>

        {/* === IN-PROGRESS COLUMN === */}
        <div className="outer-box2">
          <h2>IN-PROGRESS</h2>
          {tasks.filter(task => task.status === "inprogress").map(task => (
            <div key={task.id} className="inner-box2">
              <h4>{task.title}</h4>
              <button onClick={() => moveTask(task.id, "todo")}>&larr; back</button>
              <button onClick={() => moveTask(task.id, "completed")}>next &rarr;</button>
            </div>
          ))}
        </div>

        {/* === COMPLETED COLUMN === */}
        <div className="outer-box3">
          <h2>COMPLETED</h2>
          {tasks.filter(task => task.status === "completed").map(task => (
            <div key={task.id} className="inner-box3">
              <h4>{task.title}</h4>
              <button onClick={() => moveTask(task.id, "inprogress")}>&larr; back</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;