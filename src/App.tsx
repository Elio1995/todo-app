import { useEffect, useRef, useState } from "react";
import darkImg from "../images/bg-desktop-dark.jpg";
import sun from "../images/icon-sun.svg";
import moon from "../images/icon-moon.svg";

import "./App.css";
import MainLayout from "./Pages/MainLayout";

export interface TODO {
  id: number;
  name: string;
  status: string;
}

function App() {
  return <MainLayout />;
}

export default App;
