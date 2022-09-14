import { useRef } from "react";

import { TODO } from "../App";

import "../App.css";

export default function Input(props: any) {
  const todoRef = useRef();

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

  return (
    <>
      <div>
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 1fr",
          }}
          onSubmit={handleSubmit}
        >
          <input
            style={{
              height: "50px",
              backgroundColor:
                props.mode === false ? "hsl(235, 24%, 19%)" : "white",
              border: "none",
              marginBottom: "30px",
              paddingLeft: "30px",
              fontSize: "20px",
              borderRadius: "5px",
              marginRight: "10px",
            }}
            placeholder="Add a Todo"
            type="text"
            ref={todoRef}
          ></input>
          <button
            style={{
              height: "52px",
              fontSize: "15px",
              borderRadius: "5px",
              padding: "0",
              backgroundColor:
                props.mode === false ? "hsl(235, 24%, 19%)" : "white",
              color: props.mode === false ? "white" : "hsl(235, 24%, 19%)",
            }}
            // disabled={loading}
            type="submit"
          >
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
}
