import { useState } from "react";

import sun from "../../images/icon-sun.svg";
import moon from "../../images/icon-moon.svg";
import { TODO } from "../App";

import "../App.css";

export default function Header(props: any) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <p
          style={{
            textAlign: "start",
            fontSize: "30px",
            letterSpacing: "10px",
            fontWeight: "900",
          }}
        >
          TODO
        </p>
        <div
          style={{
            marginTop: "30px",
            textAlign: "end",
          }}
        >
          <img
            onClick={() => props.setMode(!props.mode)}
            style={{ cursor: "pointer" }}
            src={props.mode === false ? sun : moon}
          />
        </div>
      </div>
    </>
  );
}
