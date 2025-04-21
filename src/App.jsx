import DarkMode from "./components/DarkMode"
import Header from "./components/Header"
import SimpleForm from "./components/SimpleForm"
import TodoNetCore from "./components/Todo/TodoNetCore.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 
import UpdateTodo from "./components/Todo/UpdateTodo.jsx"

function App() {

  return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<TodoNetCore />}></Route>
            <Route path="/simpleForm" element={<SimpleForm />}></Route>
            <Route path="/updateTask/:taskId" element={<UpdateTodo />}></Route>
        </Routes>
    </Router> 
  )
}

export default App
