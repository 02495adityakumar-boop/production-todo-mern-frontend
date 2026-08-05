import React, { useEffect, useState, useCallback } from "react";
import Navbar from '../../components/layout/Navbar'
import TodoServices from '../../services/TodoServices'
import Spinner from '../../components/Spinner'

const TodoList = () => {
  const [todoStatus, setTodosStatus] = useState("");
  const [filterdTask, setFilterdTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);

  //get User todos
  const userData = JSON.parse(localStorage.getItem("todoapp"));
 const id = userData?.user?._id;
  console.log(id);
  const getUserTask = useCallback(async () => {
  setLoading(true);
  try {
    const { data } = await TodoServices.getAllTodo(id);
    setAllTask(data?.todos);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}, [id]);

useEffect(() => {
  getUserTask();
}, [getUserTask]);

  useEffect(() => {
  const incomplete = allTask.filter(item => !item.isCompleted);
  const completed = allTask.filter(item => item.isCompleted);

  if (todoStatus === "incomplete") {
    setFilterdTask(incomplete);
  } else if (todoStatus === "completed") {
    setFilterdTask(completed);
  } else {
    setFilterdTask(allTask);
  }
}, [todoStatus, allTask]);
   return (
    <>
      <Navbar />
      <div className="filter-container">
        <h4>Filter Todos by </h4>
        <div className="filter-group">
          <select
            className="form-select"
            onChange={(e) => setTodosStatus(e.target.value)}
          >
            <option selected>Select Status</option>
            <option value="incomplete">Incomplete</option>
            <option value="completed">completed</option>
          </select>
        </div>
      </div>
      {/* ================= */}
      {loading && <Spinner />}
      <div className="card-container">
        {filterdTask?.length === 0 ? (
          <h1 className="no-task"> No task Found</h1>
        ) : (
          filterdTask.map((task) => (
            <>
              <div
                className="card border-primary mb-3 mt-3"
                style={{ maxWidth: "18rem" }}
                key={task._id} 
              >
                <div className="card-header">
                  <div className="chead">
                    <h6>{task?.title.substring(0, 10)}</h6>
                    <h6
                      className={
                        task?.isCompleted === true ? "task-cmp " : "task-inc"
                      }
                    >
                      {task?.isCompleted === true ? "Completed " : "incomlete"}
                    </h6>
                  </div>
                </div>
                <div className="card-body">
                  <h6 style={{ fontWeight: "bold" }}>{task?.title}</h6>
                  <p className="card-text">{task?.description}</p>
                  <h6>Date : {task?.createdAt.substring(0, 10)}</h6>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default TodoList