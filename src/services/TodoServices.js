import axios from 'axios'


// get user token
const user = JSON.parse(localStorage.getItem("todoapp"))

const baseurl = process.env.REACT_APP_BASEURL;

// default auth header

if (user?.token) {
  axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
}

// create todo
function createTodo(data) {
  return axios.post(`${baseurl}/todo/create`, data);
}

// get all todo
const getAllTodo = (data) => {
    return axios.post(`${baseurl}/todo/getAll/${data}`,data)
}

// update todo
   const updateTodo = (id, data) => {
  return axios.patch(`${baseurl}/todo/update/` + id, data);
};

//DLEETE TODO
const deleteTodo = (id) => {
  return axios.post(`${baseurl}/todo/delete/` + id);
};
// 
const TodoServices = {createTodo, getAllTodo, updateTodo, deleteTodo}

export default TodoServices