import { useEffect, useRef, useState } from "react";
import { TODO } from "../App";

import "../App.css";

export default function Todos(props: any) {
  return (
    <div
      style={{
        boxShadow: props.mode === true ? "0 10px 10px -5px #E0E0E0" : "none",
      }}
    >
      <div>
        {props.todos.map((todo: TODO) => {
          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "5fr 1fr",
                backgroundColor:
                  props.mode === false ? "hsl(235, 24%, 19%)" : "white",
                color: props.mode === false ? "white" : "hsl(235, 24%, 19%)",
                borderBottom:
                  props.mode === true
                    ? "solid 1px hsl(236, 33%, 92%)"
                    : "solid 1px grey",
                paddingTop: "8px",
              }}
              className="todos"
            >
              <p
                key={todo.id}
                style={{
                  height: "50px",
                  margin: "0",
                  paddingLeft: "30px",
                  display: "flex",
                  placeItems: "center",
                  fontWeight: "600",
                  color:
                    todo.status === "Completed"
                      ? props.mode === false
                        ? "grey"
                        : "hsl(236, 9%, 61%)"
                      : props.mode === false
                      ? "white"
                      : "hsl(235, 19%, 35%)",
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
        className="footer"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          backgroundColor:
            props.mode === false ? "hsl(235, 24%, 19%)" : "white",
          height: "40px",
          padding: "20px 30px 0px 30px",
          fontSize: "13px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 5fr 1fr",
            textAlign: "center",
            fontWeight: "650",

            color: props.mode === false ? "grey" : "hsl(235, 19%, 35%)",
          }}
        >
          <span
            className="filter"
            style={{ cursor: "pointer" }}
            onClick={props.getTodoList}
          >
            All
          </span>
          <span
            className="filter"
            style={{ cursor: "pointer" }}
            onClick={props.getActiveTodoList}
          >
            Active
          </span>
          <span
            className="filter"
            style={{ cursor: "pointer" }}
            onClick={props.getCompletedTodoList}
          >
            Completed
          </span>
        </div>
        <div
          style={{
            color: props.mode === false ? "white" : "black",
            textAlign: "end",
          }}
        >
          {props.todos.length} items left
        </div>
      </div>
    </div>
  );
}
