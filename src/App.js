import { Outlet } from "react-router-dom";
import Nav from "./pages/Nav.jsx";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
}
