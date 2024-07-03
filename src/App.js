import {BrowserRouter,Route,Routes} from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
function App() {
  // const [token,setalltodo] =useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/todo" element={<Todo />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
