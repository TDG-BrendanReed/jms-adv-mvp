import React, { useState, useEffect } from 'react';
import Task from './Task';

import './App.css';



function App() {
 const [tasks, setTasks] = useState([])
 const [arrayCounter, setArrayCounter] = useState(0)
 const [taskInput, setTaskInput] = useState({
    Title: "",
  })

 
console.log(arrayCounter)
async function loadData() {
  try {
    // Uses fetch to call server
    const response = await fetch('/api/tasks');
    // Reads returned JSON, which contains one property called tasks
    const retrievedData = await response.json();
    // Retrieve tasks, which contains an array of all tasks in database
    console.log(retrievedData)
    setTasks(retrievedData.tasks) 
  
} catch (error) {
    // If there is an error, display a generic message on the page
   console.log("something went wrong")
   console.log(error)
   
}}


  async function postTask() {
    console.log(JSON.stringify(taskInput))
    const response = await fetch(
      '/api/tasks', // API location
      {
          method: 'POST', // POST to create new item
          body: JSON.stringify(taskInput), // Add task to body
          headers: {
              'Content-Type': 'application/json' // Set return type to JSON
          }
          
      }
      
  );
  console.log('Response: ')
  console.log(response)
    }

  const handleChange = (e) => {
    setTaskInput({[e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // ... submit to API or something
    // Call server
    postTask()
    loadData()
  };

  useEffect(() => {
    loadData()
    setArrayCounter(tasks.length)
},[tasks.length, taskInput]);

  return <article>
  <h1>My tasks</h1>
  <ul id="task-list"></ul>

  <div>
      <label htmlFor="name">Title: </label><input type="text" name="Title" onChange={handleChange} />
  </div>
  <div>
      <button type="button" onClick={handleSubmit}>Add task</button>
  </div>
  {console.log(tasks)}
  {tasks.map((task, i) => (
    <Task i={i} id={task._id} completed={task.completed} title={task.Title} />
  )
  )}
  
</article>;
}

// 

export default App;
