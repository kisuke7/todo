import { useState } from "react";

export function CreateTodo({ setTodos }){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return(
        <div>
            <input style={{
                width: "500px", 
                height: "30px", 
                margin: "10px",
                padding: "10px"}} type="text" placeholder="Title" onChange={function(e){
                    setTitle(e.target.value);
                }} /><br />
            <input style={{
                width: "500px", 
                height: "30px", 
                margin: "10px",
                padding: "10px"}} type="text" placeholder="Description" onChange={function(e){
                    setDescription(e.target.value);
                }}   /><br />
            <button style={{
                width: "100px", 
                height: "30px", 
                margin: "10px",
                padding: "10px"}} onClick={async () => {
                    fetch("http://localhost:3000/todos",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "title": title,
                            "description": description
                        })
                    }).then(async function(res){
                            const json = await res.json();
                            alert("todo added successfully");
                            // Clear the input fields
                            setTitle("");
                            setDescription("");
                            // Refresh the todos list
                            fetch("http://localhost:3000/todos")
                                .then(res => res.json())
                                .then(data => {
                                    setTodos(data.todos);
                                });
                        })
                }}>Add Todo</button>
        </div>
    )
}