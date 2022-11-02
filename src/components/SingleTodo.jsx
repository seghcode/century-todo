import React, { useEffect, useState } from "react";
// import axios from "axios";

const SingleTodo = ({ todo, onUpdate, onToggle, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  useEffect(() => {
    setTitle(todo.title)
    setDesc(todo.description)
  }, [todo.title, todo.description])

  return (
    <div>
      {isEditing === false ? (
        <li className={`todo ${todo.completed && 'completed'}`}>
          <h4 style={{ fontWeight: "bold" }}>
            Title: <span>{todo.title}</span>
          </h4>
          <p>Description: {todo.description} </p>
          <button onClick={() => onToggle(todo.uid)} className="toggle">
            Toggle
          </button>
          <button className="update" onClick={()=>setIsEditing(true)}>Update</button>
          <button onClick={() => onDelete(todo.uid)} className="delete">
            Delete
          </button>
        </li>
      ) : (
        <form >
          <div className="form-group">
            
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button type="button" onClick={()=>{ 
              onUpdate(todo.uid,title,description)
              setIsEditing(false)
              } } className="add">
              SAVE
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SingleTodo;
