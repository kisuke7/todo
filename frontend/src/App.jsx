import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(function(){
    fetch("http://localhost:3000/todos")
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    setTodos(data.todos);
  })
  }, []);
  return (
    <div>
      <CreateTodo setTodos={setTodos} />
      <Todos todos={todos} />
    </div>
  )
}

export default App
