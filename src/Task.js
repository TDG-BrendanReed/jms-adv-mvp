import React from "react";

function Task({ id, completed, title, i }) {
    console.log(id)
    console.log(completed)
    console.log(title)
    console.log(i)
    return <div>
    <li key={i}><label htmlFor={id} className={completed ? 'completed' : ''}> Task: {title} </label></li>
    </div>
}

export default Task