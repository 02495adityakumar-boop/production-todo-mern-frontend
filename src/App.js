import {Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import About from './pages/About/About'
import TodoList from './pages/Todos/TodoList'
import HomePage from './pages/Home/HomePage'
import  {Toaster} from 'react-hot-toast'



function App() {
  return (
    <div>
  <Routes>
    <Route path='/' element = {<Landing/>} />
    <Route path='/Home' element = {<HomePage/>} />
    <Route path='/Login' element =  {<Login/>} />
    <Route path='/Register' element =  {<Register/>} />
    <Route path='/About' element =  {<About/>} />
    <Route path='/Login' element =  {<Login/>} />
    <Route path='/TodoList' element =  {<TodoList/>} />
  </Routes>
  <Toaster />
    </div>
  );
}

export default App;
