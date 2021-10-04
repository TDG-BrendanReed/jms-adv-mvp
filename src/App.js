import React from "react";
import { PageLayout } from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Switch, Route } from "react-router-dom";
import DashboardContainer from "./components/DashboardContainer";
import LoginLanding from "./LoginLanding";

import "./App.css";
import { SignInButton } from "./components/SignInButton";

function App() {
  // const [tasks, setTasks] = useState([])
  //const [taskInput, setTaskInput] = useState({
  //   Title: "",
  // })

  /*
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
*/
  /* const handleChange = (e) => {
    setTaskInput({[e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // ... submit to API or something
    // Call server
    postTask()
    loadData()
  };
*/
  // useEffect(() => {

  // loadData()
  // setArrayCounter(tasks.length)

  // const interval=setInterval(()=>{
  //  loadData()
  // },10000)

  // return()=>clearInterval(interval)

  //},[tasks.length, taskInput]);

  return (
    <div>
      <AuthenticatedTemplate>
        <PageLayout>
          <DashboardContainer />
          <>
            <Switch>
              <Route path="/Users">
                <SignInButton />
                <SignInButton />
              </Route>
              <Route path="/Orders">
                <SignInButton />
                <SignInButton />
                <SignInButton />
              </Route>
              <Route path="/">
                <SignInButton />
              </Route>
            </Switch>
          </>
        </PageLayout>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginLanding />
      </UnauthenticatedTemplate>
    </div>
  );

  /* <article>
  <h1>My tasks</h1>
  <ul id="task-list"></ul>
  
   
  <div>
      <label htmlFor="name">Title: </label><input type="text" name="Title" onChange={handleChange} />
  </div>
  <main className="App">
      <h1 className="text-center">Drag and Drop Example</h1>
      
    </main>
  <div>
      <button type="button" onClick={handleSubmit}>Add task</button>
  </div>
  {console.log(tasks)}
  {tasks.map((task, i) => (
    <Task i={i} id={task._id} completed={task.completed} title={task.Title} />
  )
  )}
  
</article> */
}

//

export default App;

/*

  <Container>
    {items.map(index => {
      const isDragging = orderState.draggedIndex === index;
      const draggedTop = orderState.order.indexOf(index) * (HEIGHT + 10);
      const top = orderState.dragOrder.indexOf(index) * (HEIGHT + 10);

      return(
        <Draggable key={index} id={index} onDrag={handleDrag} onDragEnd={handleDragEnd}>
        <Rect key={index} isDragging={isDragging} top={isDragging ? draggedTop : top}>
          {index}</Rect>
</Draggable>
      )
    })}
    </Container>
    <Rect />

  */
