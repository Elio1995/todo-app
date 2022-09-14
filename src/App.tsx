import MainLayout from "./Pages/MainLayout";
import "./App.css";

export interface TODO {
  id: number;
  name: string;
  status: string;
}

function App() {
  return <MainLayout />;
}

export default App;
