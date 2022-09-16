import Completed from "../../images/checked.png";
import Delete from "../../images/close.png";
import { TODO } from "../App";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "../App.css";

export default function Todos(props: any) {
  const activeTodo = props.todos.filter(
    (todo: TODO) => todo.status === "Active"
  );
  return (
    <div
      style={{
        boxShadow: props.mode === true ? "0 10px 10px -5px #E0E0E0" : "none",
      }}
    >
      <p style={{ marginTop: "0px", textAlign: "start" }}>
        If you want to complete or delete a todo, select it first and then
        complete or delete it
      </p>
      <DragDropContext onDragEnd={props.handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              // className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {props.todos.map((todo: TODO, index: Number) => {
                return (
                  <Draggable
                    key={todo.name}
                    draggableId={todo.name}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "5fr 1fr",
                          backgroundColor:
                            props.mode === false
                              ? "hsl(235, 24%, 19%)"
                              : "white",
                          color:
                            props.mode === false
                              ? "white"
                              : "hsl(235, 24%, 19%)",
                          borderBottom:
                            props.mode === true
                              ? "solid 1px hsl(236, 33%, 92%)"
                              : "solid 1px grey",
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
                                  ? "hsl(236, 9%, 61%)"
                                  : "hsl(236, 9%, 61%)"
                                : props.mode === false
                                ? "hsl(233, 11%, 84%)"
                                : "hsl(235, 19%, 35%)",
                            textDecorationLine:
                              todo.status === "Completed"
                                ? "line-through"
                                : "none",
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
                            <div
                              style={{
                                marginRight: "20px",
                                cursor: "pointer",
                                color:
                                  props.mode === false
                                    ? "grey"
                                    : "hsl(236, 9%, 61%)",
                              }}
                            >
                              <span
                                onClick={() => props.setTodoId(todo.id)}
                                className={
                                  props.mode === false
                                    ? "filterDark"
                                    : "filterLight"
                                }
                              >
                                Select
                              </span>
                            </div>
                            <span
                              style={{
                                marginTop: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                props.deleteTodo() && props.getTodoList()
                              }
                            >
                              <img
                                width="20px"
                                height="20px"
                                src={Delete}
                              ></img>
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
                            <div
                              style={{
                                marginRight: "20px",
                                cursor: "pointer",
                                color:
                                  props.mode === false
                                    ? "grey"
                                    : "hsl(236, 9%, 61%)",
                              }}
                            >
                              <span
                                className={
                                  props.mode === false
                                    ? "filterDark"
                                    : "filterLight"
                                }
                                onClick={() => props.setTodoId(todo.id)}
                              >
                                Select
                              </span>
                            </div>
                            <span
                              style={{
                                marginRight: "20px",
                                marginTop: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                props.statusChange() && props.getTodoList()
                              }
                            >
                              <img
                                width="20px"
                                height="20px"
                                src={Completed}
                              ></img>
                            </span>
                            <span
                              style={{
                                marginTop: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                props.deleteTodo() && props.getTodoList()
                              }
                            >
                              <img
                                width="20px"
                                height="20px"
                                src={Delete}
                              ></img>
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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

            color: props.mode === false ? "grey" : "hsl(236, 9%, 61%)",
          }}
        >
          <span
            className={props.mode === false ? "filterDark" : "filterLight"}
            style={{
              cursor: "pointer",
            }}
            onClick={props.getTodoList}
          >
            All
          </span>
          <span
            className={props.mode === false ? "filterDark" : "filterLight"}
            style={{ cursor: "pointer" }}
            onClick={props.getActiveTodoList}
          >
            Active
          </span>
          <span
            className={props.mode === false ? "filterDark" : "filterLight"}
            style={{ cursor: "pointer" }}
            onClick={props.getCompletedTodoList}
          >
            Completed
          </span>
        </div>
        <div
          style={{
            color: props.mode === false ? "grey" : "hsl(236, 9%, 61%)",
            textAlign: "end",
          }}
        >
          {activeTodo.length} items left
        </div>
      </div>
    </div>
  );
}
