import { useEffect, useRef, useState } from "react";
import darkImg from "../../images/bg-desktop-dark.jpg";
import sun from "../../images/icon-sun.svg";
import moon from "../../images/icon-moon.svg";
import { TODO } from "../App";

import "../App.css";
import Header from "../Components/Header";
import Input from "../Components/Input";

// interface TODO {
//   id: number;
//   name: string;
//   status: string;
// }

export default function MainLayout() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [selectedTodoId, setTodoId] = useState(Number);

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
  function handleSubmit(e: any) {
    const data: TODO = {
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

  const selectedTodo: undefined | TODO = todos.find(
    (todo: TODO | undefined) => todo?.id === selectedTodoId
  );
  const selectedId = selectedTodo?.id;

  function statusChange() {
    // selectedActiveTodo?.status === "Completed";
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
    // selectedActiveTodo?.status === "Completed";
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
          <div style={{ border: "1px solid transparent", borderRadius: "5px" }}>
            <div style={{ borderRadius: "5px" }}>
              {todos.map((todo: TODO) => {
                return (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "5fr 1fr",

                      backgroundColor:
                        mode === false ? "hsl(235, 24%, 19%)" : "white",
                      color: mode === false ? "white" : "hsl(235, 24%, 19%)",
                      borderBottom: "solid 1px grey",
                    }}
                  >
                    <p
                      key={todo.id}
                      style={{
                        height: "50px",
                        margin: "0",
                        paddingLeft: "30px",
                        display: "flex",
                        placeItems: "center",
                        color:
                          todo.status === "Completed"
                            ? "grey"
                            : mode === false
                            ? "white"
                            : "hsl(235, 24%, 19%)",
                        textDecorationLine:
                          todo.status === "Completed" ? "line-through" : "none",
                      }}
                    >
                      {todo.name}
                    </p>
                    {todo.status === "Completed" ? (
                      <div
                        style={{
                          display: "flex",
                          placeItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          paddingRight: "20px",
                        }}
                      >
                        <span
                          style={{
                            marginRight: "20px",
                          }}
                          onClick={() => setTodoId(todo.id)}
                        >
                          Select
                        </span>

                        <span onClick={() => deleteTodo() && getTodoList()}>
                          X
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    {todo.status === "Active" ? (
                      <div
                        style={{
                          display: "flex",
                          placeItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          paddingRight: "20px",
                        }}
                      >
                        <span
                          style={{
                            marginRight: "20px",
                          }}
                          onClick={() => setTodoId(todo.id)}
                        >
                          Select
                        </span>
                        <span
                          style={{
                            marginRight: "20px",
                          }}
                          onClick={() => statusChange() && getTodoList()}
                        >
                          Complete
                        </span>
                        <span onClick={() => deleteTodo() && getTodoList()}>
                          X
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                backgroundColor:
                  mode === false ? "hsl(235, 24%, 19%)" : "white",
                height: "40px",
                padding: "20px 30px 0px 30px",
                fontSize: "13px",
                borderBottom: "solid 1px grey",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  textAlign: "start",
                  fontWeight: "800",

                  color: mode === false ? "white" : "hsl(235, 24%, 19%)",
                }}
              >
                <span style={{ cursor: "pointer" }} onClick={getTodoList}>
                  All
                </span>
                <span style={{ cursor: "pointer" }} onClick={getActiveTodoList}>
                  Active
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={getCompletedTodoList}
                >
                  Completed
                </span>
              </div>
              <div
                style={{
                  color: mode === false ? "white" : "hsl(235, 24%, 19%)",
                  textAlign: "end",
                }}
              >
                {todos.length} items left
              </div>
              {/* <div
                style={{
                  color: mode === false ? "white" : "hsl(235, 24%, 19%)",
                  textAlign: "end",
                }}
              >
                <span onClick={() => deleteCompletedTodo() && getTodoList()}>
                  {" "}
                  Clear Completed
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
