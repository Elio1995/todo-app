import { useEffect, useRef, useState } from "react";
import darkImg from "../../images/bg-desktop-dark.jpg";
import sun from "../../images/icon-sun.svg";
import moon from "../../images/icon-moon.svg";
import { TODO } from "../App";

import "../App.css";
import Header from "../Components/Header";
import Input from "../Components/Input";
import Todos from "../Components/Todos";

// interface TODO {
//   id: number;
//   name: string;
//   status: string;
// }

export default function MainLayout() {
  const [todos, setTodos] = useState([]);
  const [mode, setMode] = useState(false);
  const [selectedTodoId, setTodoId] = useState(Number);

  function getTodoList() {
    return fetch(`http://localhost:3000/todo`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }
  function getActiveTodoList() {
    return fetch(`http://localhost:3000/todo`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.filter((todo: TODO) => todo.status === "Active"));
      });
  }
  function getCompletedTodoList() {
    return fetch(`http://localhost:3000/todo`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.filter((todo: TODO) => todo.status === "Completed"));
      });
  }

  const selectedTodo: undefined | TODO = todos.find(
    (todo: TODO | undefined) => todo?.id === selectedTodoId
  );
  const selectedId = selectedTodo?.id;

  function statusChange() {
    return fetch(`http://localhost:3000/todo/${selectedId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "Completed",
      }),
      headers: {
        "Content-Type": "application/json ; charset=UTF-8",
      },
    })
      .then((response) => response.json())

      .then((json) => console.log(json));
  }
  function deleteTodo() {
    return fetch(`http://localhost:3000/todo/${selectedId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json ; charset=UTF-8",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())

      .then((json) => console.log(json));
  }

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div
      style={{
        backgroundColor: mode === false ? "hsl(235, 21%, 11%)" : "white",
        height: "100vh",
      }}
    >
      <img style={{ width: "100vw" }} src={darkImg}></img>
      <div className="App">
        <div
          style={{
            position: "absolute",
            top: "40px",
            width: "500px",
            height: "600px",
          }}
        >
          <Header mode={mode} setMode={setMode} />
          <Input mode={mode} />
          <Todos
            todos={todos}
            setTodos={setTodos}
            getTodoList={getTodoList}
            getActiveTodoList={getActiveTodoList}
            getCompletedTodoList={getCompletedTodoList}
            statusChange={statusChange}
            deleteTodo={deleteTodo}
            mode={mode}
            setTodoId={setTodoId}
          />
        </div>
      </div>
    </div>
  );
}
