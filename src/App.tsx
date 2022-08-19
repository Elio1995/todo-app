import { useEffect, useState } from "react";
import darkImg from "../images/bg-desktop-dark.jpg";
import "./App.css";
function App() {
  const [todo, setTodo] = useState([]);

  function getTodoList() {
    return fetch(`http://localhost:3000/todo`)
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);
      });
  }
  useEffect(() => {
    getTodoList();
  }, []);
  console.log("TODO", todo);

  return (
    <>
      <img style={{ width: "100vw" }} src={darkImg}></img>
      <div className="App">
        <div
          style={{
            position: "absolute",
            top: "120px",
            width: "500px",
            height: "600px",
            border: "2px solid black",
          }}
        >
          <div style={{ textAlign: "start" }}>Hey</div>
        </div>
      </div>
    </>
  );
}

export default App;
