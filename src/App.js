import React, { useState, useEffect } from 'react';

import './App.css';



function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('')

  async function loadTasks() {
    try {
        // Uses fetch to call server
        const response = await fetch('/api/tasks');
        // Reads returned JSON, which contains one property called tasks
        const retrievedData = await response.json();
        // Retrieve tasks, which contains an array of all tasks in database
        const retrievedTasks = retrievedData.tasks;
        // Loop through all tasks
        for (let task of retrievedTasks) {
            // Add each task to the array
            setTasks(tasks.push(task));
            console.log(tasks);
        }    
    } catch {
        // If there is an error, display a generic message on the page
       
    }
  }

  async function postTask() {
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
    setTaskInput(e.target.value);
    console.log(taskInput)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(taskInput);
    console.log(JSON.stringify(taskInput))
    // ... submit to API or something
    // Call server
    postTask()
    
  };

  useEffect(() => {
    loadTasks()    
    
  });

  return <article>
  <h1>My tasks</h1>
  <ul id="task-list"></ul>

  <div>
      <label for="name">Title: </label><input type="text" name="taskInput" onChange={handleChange} />
  </div>
  <div>
      <button type="button" onClick={handleSubmit}>Add task</button>
  </div>
</article>;
}

export default App;
