import React from "react";

function Task({ id, completed, title, i }) {
    
    return <div>
    <li key={i}><label htmlFor={id} className={completed ? 'completed' : ''}> Task: {title} </label></li>
    </div>
}

export default Task