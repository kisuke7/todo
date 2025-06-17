import { useState } from "react";

export function Todos({todos}){
    return(
        <div>
            {todos.map(function(todo){
                return <div>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button>{todo.completed ? "completed" : "mark as done"}</button>
                </div>
            })}
        </div>
    )
}