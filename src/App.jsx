import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id:1, title: "learn react state", status: "todo"}
  ]);

  const [taskInput, setTaskInput] = useState("");
   
  const handleAddTask = (e) =>{
    e.preventDefault();
    
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: taskInput,
      status: "todo"
    };

    setTasks([...tasks, newTask]);

    setTaskInput("");
  }

  const moveTask = (id, newStatus) => {
  console.log("Button clicked! Moving card ID:", id, "to status:", newStatus);
  
  setTasks(tasks.map(task => 
    task.id === id ? { ...task, status: newStatus } : task
  ));
};
  return (  
    <>
      <div className="heading">
        <h1> KANBAN </h1>
      </div>

      {/* --- Added the missing input form so you can type new tasks --- */}
      <form onSubmit={handleAddTask} style={{ textAlign: 'center', marginBottom: '20px' }}>
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
        
        {/* === 1. TODO COLUMN === */}
        <div className="outer-box1">
          <h2>TODO</h2>
          {tasks
            .filter(task => task.status === "todo")
            .map(task => (
              <div key={task.id} className="inner-box">
                <h4>{task.title}</h4>
                <button onClick={() => moveTask(task.id, "inprogress")}>next &rarr;</button>
              </div>
            ))
          }
        </div>

        {/* === 2. IN-PROGRESS COLUMN === */}
        <div className="outer-box2">
          <h2>IN-PROGRESS</h2>
          {tasks
            .filter(task => task.status === "inprogress")
            .map(task => (
              <div key={task.id} className="inner-box2">
                <h4>{task.title}</h4>
                <button onClick={() => moveTask(task.id, "todo")}>&larr; previous</button>
                <button onClick={() => moveTask(task.id, "completed")}>next &rarr;</button>
              </div>
            ))
          }
        </div>

        {/* === 3. COMPLETED COLUMN === */}
        <div className="outer-box3">
          <h2>COMPLETED</h2>
          {tasks
            .filter(task => task.status === "completed")
            .map(task => (
              <div key={task.id} className="inner-box3">
                <h4>{task.title}</h4>
                <button onClick={() => moveTask(task.id, "inprogress")}>&larr; previous</button>
              </div>
            ))
          }
        </div>

      </div>
    </>
  )
}

export default App
