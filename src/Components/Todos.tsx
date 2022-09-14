import { useEffect, useRef, useState } from "react";
import { TODO } from "../App";

import "../App.css";

export default function Todos(props) {
  return (
    <div style={{ border: "1px solid transparent", borderRadius: "5px" }}>
      <div style={{ borderRadius: "5px" }}>
        {props.todos.map((todo: TODO) => {
          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "5fr 1fr",

                backgroundColor:
                  props.mode === false ? "hsl(235, 24%, 19%)" : "white",
                color: props.mode === false ? "white" : "hsl(235, 24%, 19%)",
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
                      : props.mode === false
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
                    onClick={() => props.setTodoId(todo.id)}
                  >
                    Select
                  </span>

                  <span
                    onClick={() => props.deleteTodo() && props.getTodoList()}
                  >
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
                    onClick={() => props.setTodoId(todo.id)}
                  >
                    Select
                  </span>
                  <span
                    style={{
                      marginRight: "20px",
                    }}
                    onClick={() => props.statusChange() && props.getTodoList()}
                  >
                    Complete
                  </span>
                  <span
                    onClick={() => props.deleteTodo() && props.getTodoList()}
                  >
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
            props.mode === false ? "hsl(235, 24%, 19%)" : "white",
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

            color: props.mode === false ? "white" : "hsl(235, 24%, 19%)",
          }}
        >
          <span style={{ cursor: "pointer" }} onClick={props.getTodoList}>
            All
          </span>
          <span style={{ cursor: "pointer" }} onClick={props.getActiveTodoList}>
            Active
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={props.getCompletedTodoList}
          >
            Completed
          </span>
        </div>
        <div
          style={{
            color: props.mode === false ? "white" : "hsl(235, 24%, 19%)",
            textAlign: "end",
          }}
        >
          {props.todos.length} items left
        </div>
      </div>
    </div>
  );
}
