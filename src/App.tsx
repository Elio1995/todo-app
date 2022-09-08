import { useEffect, useRef, useState } from "react";
import darkImg from "../images/bg-desktop-dark.jpg";

import "./App.css";

interface TIME {
  id: number;
  name: string;
  status: string;
}

function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

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
        setTodos(data.filter((todo: TIME) => todo.status === "Active"));
      });
  }
  function getCompletedTodoList() {
    return fetch(`http://localhost:3000/todo`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.filter((todo: TIME) => todo.status === "Completed"));
      });
  }
  function handleSubmit(e: any) {
    const data: TIME = {
      id: Math.random() * (1000 - 1) + 1,
      name: todoRef.current.value,
      status: "Active",
    };

    fetch("http://localhost:3000/todo", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    getTodoList();
  }, []);
  console.log("TODO", todos);

  return (
    <>
      <img style={{ width: "100vw" }} src={darkImg}></img>
      <div className="App">
        <div
          style={{
            position: "absolute",
            top: "80px",
            width: "500px",
            height: "600px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <p style={{ textAlign: "start" }}>TODO</p>
            <p style={{ textAlign: "end" }}>TODO</p>
          </div>
          <div>
            <form noValidate onSubmit={handleSubmit}>
              <label htmlFor="html">HTML</label>
              <input
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "hsl(235, 24%, 19%)",
                  border: "none",
                  marginBottom: "30px",
                }}
                type="text"
                ref={todoRef}
              ></input>
              <button disabled={loading} type="submit">
                Add Todo
              </button>
            </form>
          </div>
          <div>
            {todos.map((todo: TIME) => {
              return (
                <p
                  key={todo.id}
                  style={{
                    backgroundColor: "hsl(235, 24%, 19%)",
                    height: "50px",
                    margin: "0",
                    paddingLeft: "30px",
                    borderBottom: "solid 1px grey",
                    display: "flex",
                    placeItems: "center",
                  }}
                >
                  {todo.name}
                </p>
              );
            })}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 6fr 5fr",
              backgroundColor: "hsl(235, 24%, 19%)",
              height: "40px",
              padding: "20px 30px 0px 30px",
              fontSize: "13px",
            }}
          >
            <div style={{ textAlign: "start" }}>{todos.length} items left</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                textAlign: "start",
                fontWeight: "800",
              }}
            >
              <span onClick={getTodoList}>All</span>
              <span onClick={getActiveTodoList}>Active</span>
              <span onClick={getCompletedTodoList}>Completed</span>
            </div>
            <div style={{ textAlign: "end" }}>Clear Completed</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
