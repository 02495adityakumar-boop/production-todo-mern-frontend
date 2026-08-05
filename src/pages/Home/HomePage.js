import React, { useEffect, useState, useCallback } from "react";
import Navbar from '../../components/layout/Navbar'
import PopModel from '../../components/layout/PopModel'
import TodoServices from '../../services/TodoServices'
import Card from "../../components/card/Card"
import Spinner from '../../components/Spinner'

const HomePage = () => {

  const [showModal,setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [allTask, setAllTask] = useState([]);


  //handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };

  //search
  const handleSearch = (e) => {
    const query = e.target.value;
    let filterList = allTask?.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase())
    );
    console.log("Filterd list===>", filterList);
    setSearchQuery(query);
    if (query && filterList.length > 0) {
      setAllTask(filterList && filterList);
    } else {
      getUserTask();
    }
  };

  //get User todos
  const userData = JSON.parse(localStorage.getItem("todoapp"));
const id = userData?.user?._id;
  console.log(id);
const getUserTask = useCallback(async () => {
  setLoading(true);
  try {
    const { data } = await TodoServices.getAllTodo(id);
    setLoading(false);
    setAllTask(data?.todos);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
}, [id]);

useEffect(() => {
  getUserTask();
}, [getUserTask]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="add-task">
          <h1>Your Task</h1>
          <input
            type="search"
            placeholder="search your task"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className=" btn btn-primary" onClick={openModalHandler}>
            Create Task <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          allTask && <Card allTask={allTask} getUserTask={getUserTask} />
        )}
<PopModel
  showModal={showModal}
  setShowModal={setShowModal}
  title={title}
  setTitle={setTitle}
  description={description}
  setDescription={setDescription}
  getUserTask={getUserTask}
/>

   </div>

    </>
  )
}

export default HomePage