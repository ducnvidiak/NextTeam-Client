import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/Header";
import Events from "./pages/Events";


function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route element={<Home></Home>} path="/"></Route>
        <Route element={<Home></Home>} path="/home"></Route>
        <Route element={<Login></Login>} path="/login"></Route>
        <Route element={<Register></Register>} path="/register"></Route>
        <Route element={<Events></Events>} path="/events"></Route>
      </Routes>
    </>
  );
}

export default App;
