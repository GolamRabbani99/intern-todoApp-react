
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [todo, setTodo] = useState([]);

  const [inputText, setInputText] = useState({
    id: "",
    title: "",
  });

  function handleChange(e) {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  }
  const [status, setStatus] = useState(false);
  // async function addItem(e) {
   
  //   e.preventDefault();
  //   await axios.post("http://localhost:3333/todos", inputText);
  //   setStatus(true);
  //   setInputText("");
  // }

  async function addItem(e) {
    e.preventDefault();

    const res = await axios.post("http://localhost:3333/todos", inputText);

    setTodo([res.data, ...todo]) // Push to the front of existing todo list

    setStatus(true);
    setInputText("");
  }

  async function getTodo() {
    try {
      const todo = await axios.get("http://localhost:3333/todos");

      // console.log(todo.data)
      setTodo(todo.data);
    } catch (error) {
      console.log("something is wrong");
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    getTodo();
  }, []);

  return (
    
    
    <div className="container">
      
      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <div className="form">
        <input onChange={handleChange} type="text" name="title" />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul className="user">
          {todo.map((todos) => {
            const { id, title } = todos;
            return <li key={id}>{title}</li>;
          })}
        </ul>
      </div>
    </div>
    
  );
}

export default App;
