import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SingleTodo from "./SingleTodo";
const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [todos, setTodos] = useState([]);

  const onUpdate = (uid, title, description) => {
    axios
      .patch(`http://localhost:3232/api/todos/update/${uid}`, {
        title,
        description,
      })
      .then((res) => {
        const updatedTodos = todos.map((t) => {
          if (t.uid === uid) {
            return res.data;
          }
          return t;
        });

        setTodos(updatedTodos);
        alert("updated");
      });
  };
  const onToggle = async (uid) => {
    try {
      const res = await axios.get(
        `http://localhost:3232/api/todos/toggle-completion-status/${uid}`
      );
      // setTodos([...todos], res.data);
      const updatedTodos = todos.map((t) => {
        if (t.uid === uid) {
          return res.data;
        }
        return t;
      });

      setTodos(updatedTodos);
    } catch (err) {
      console.log(err);
    }
  };
  // };

  const onDelete = (uid) => {
    // log
    console.log("worked");
    axios.delete(`http://localhost:3232/api/todos/delete/${uid}`);
    setTodos(
      todos.filter((todo) => {
        return todo.uid !== uid;
      })
    );
  };

  //add todo
  const handleSubmit = (e) => {
    e.preventDefault();
    // post to api
    addTodos(title, description);
  };

  const addTodos = (title, description) => {
    axios
      .post("http://localhost:3232/api/todos/create", { title, description })
      .then((res) => {
        setTodos([res.data, ...todos]);
        setTitle("");
        setDesc("");
        setMessage("submited successfull");
      });

    setMessage("");
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get("http://localhost:3232/api/todos/list");
        setTodos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTodos();
  }, []);

  return (
    <div className="container">
      <h4>Century Todo List</h4>

      <div className="todo-form">
        <form onSubmit={handleSubmit}>
          <h5 style={{textAlign:'center'}}>ADD TODO</h5>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <button type="submit" className="add">
              ADD
            </button> 
          </div>
          <div className="message">{message ? <p>{message}</p> : " "} </div>
        </form>
      </div>
      <div className="todo">
        <ul>
          {todos.map((todo) => (
            <SingleTodo
              key={todo.uid}
              onDelete={onDelete}
              onUpdate={onUpdate}
              onToggle={onToggle}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
