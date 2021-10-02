import React, { useState, useEffect } from 'react';

import './App.css';



function App() {
 const [taskInput, setTaskInput] = useState({
    Title: "",
  })
var taskArray = []
  async function loadTasks() {
    try {
        // Uses fetch to call server
        const response = await fetch('/api/tasks');
        // Reads returned JSON, which contains one property called tasks
        const retrievedData = await response.json();
        // Retrieve tasks, which contains an array of all tasks in database
        console.log(retrievedData)
        const retrievedTasks = retrievedData.tasks;
        
        // Loop through all tasks
        for (let task of retrievedTasks) {
            // Add each task to the array
            taskArray.push(task)
            console.log(taskArray)
        }
            
    } catch (error) {
        // If there is an error, display a generic message on the page
       console.log("something went wrong")
       console.log(error)
       
    }
  }

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
    
  };

  useEffect(() => {
        loadTasks()
    
  });

  return <article>
  <h1>My tasks</h1>
  <ul id="task-list"></ul>

  <div>
      <label htmlFor="name">Title: </label><input type="text" name="Title" onChange={handleChange} />
  </div>
  <div>
      <button type="button" onClick={handleSubmit}>Add task</button>
  </div>
  {console.log(taskArray)}
  {taskArray.map((task, i) => (
    <li key={i}><label htmlFor={task._id} className={task.completed ? 'completed' : ''}> Task: {task.Title} </label></li>
  ))}
</article>;
}

// 

export default App;
