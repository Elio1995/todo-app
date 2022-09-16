//@ts-nocheck
import { useEffect, useState } from "react";
import darkImg from "../../images/bg-desktop-dark.jpg";
import lightImg from "../../images/bg-desktop-light.jpg";
import Header from "../Components/Header";
import Input from "../Components/Input";
import Todos from "../Components/Todos";
import { TODO } from "../App";
import "../App.css";

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

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...todos];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setTodos(updatedList);
  };

  return (
    <div
      style={{
        backgroundColor:
          mode === false ? "hsl(235, 21%, 11%)" : "hsl(0, 0%, 98%)",
        height: "100vh",
      }}
    >
      <img
        style={{ width: "100vw" }}
        src={mode === false ? darkImg : lightImg}
      ></img>
      <div className="App">
        <div
          style={{
            position: "absolute",
            top: "20px",
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
            handleDrop={handleDrop}
          />
          <p style={{ color: mode === false ? "grey" : "hsl(236, 9%, 61%)" }}>
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </div>
  );
}
