import React, { useEffect, useState, useCallback } from "react";
import Navbar from '../../components/layout/Navbar'
import TodoServices from '../../services/TodoServices'
import Spinner from '../../components/Spinner'


const TodoList = () => {
  const [todoStatus, setTodosStatus] = useState("all");
  const [filterdTask, setFilterdTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);

  // Get user info from localStorage
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData?.user?._id;

  const getUserTask = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setAllTask(data?.todos || []);
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
    const incomplete = allTask?.filter(item => !item?.isCompleted) || [];
    const completed = allTask?.filter(item => item?.isCompleted) || [];

    if (todoStatus === "incomplete") {
      setFilterdTask(incomplete);
    } else if (todoStatus === "completed") {
      setFilterdTask(completed);
    } else {
      setFilterdTask(allTask);
    }
  }, [todoStatus, allTask]);

  const completedCount = allTask?.filter(t => t?.isCompleted)?.length || 0;
  const pendingCount = (allTask?.length || 0) - completedCount;

  return (
    <div className="todolist-wrapper">
      <Navbar />

      <main className="container todolist-container">
        {/* Header and Filter Section */}
        <section className="todolist-header">
          <div className="header-text">
            <h2>Task Archive & Overview</h2>
            <p>Filter, review, and organize your complete task backlog</p>
          </div>

          <div className="filter-controls">
            {/* Quick Filter Pill Buttons */}
            <div className="filter-pills">
              <button
                type="button"
                className={`pill-btn ${todoStatus === "all" ? "active" : ""}`}
                onClick={() => setTodosStatus("all")}
              >
                All <span>{allTask?.length || 0}</span>
              </button>
              <button
                type="button"
                className={`pill-btn ${todoStatus === "incomplete" ? "active" : ""}`}
                onClick={() => setTodosStatus("incomplete")}
              >
                Incomplete <span>{pendingCount}</span>
              </button>
              <button
                type="button"
                className={`pill-btn ${todoStatus === "completed" ? "active" : ""}`}
                onClick={() => setTodosStatus("completed")}
              >
                Completed <span>{completedCount}</span>
              </button>
            </div>

            {/* Dropdown Alternative */}
            <div className="dropdown-filter">
              <select
                className="status-select"
                value={todoStatus}
                onChange={(e) => setTodosStatus(e.target.value)}
              >
                <option value="all">Filter: All Tasks</option>
                <option value="incomplete">Filter: Incomplete</option>
                <option value="completed">Filter: Completed</option>
              </select>
            </div>
          </div>
        </section>

        {/* Task Cards or Spinner */}
        {loading ? (
          <div className="spinner-center">
            <Spinner />
          </div>
        ) : (
          <div className="cards-grid">
            {filterdTask?.length === 0 ? (
              <div className="no-task-placeholder">
                <div className="empty-icon-circle">
                  <i className="fa-solid fa-list-check"></i>
                </div>
                <h3>No tasks found</h3>
                <p>
                  {todoStatus === "all"
                    ? "You haven't created any tasks yet."
                    : `There are currently no ${todoStatus} tasks.`}
                </p>
              </div>
            ) : (
              filterdTask.map((task) => {
                const formattedDate = task?.createdAt
                  ? new Date(task.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  : "Recently";

                return (
                  <div className="task-card" key={task._id}>
                    <div className="task-card-header">
                      <span
                        className={`status-badge ${
                          task?.isCompleted ? "badge-completed" : "badge-incomplete"
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            task?.isCompleted ? "fa-circle-check" : "fa-clock"
                          }`}
                        ></i>
                        {task?.isCompleted ? "Completed" : "Incomplete"}
                      </span>
                      <span className="task-date">
                        <i className="fa-regular fa-calendar"></i> {formattedDate}
                      </span>
                    </div>

                    <div className="task-card-body">
                      <h4 className="task-title">{task?.title}</h4>
                      <p className="task-desc">
                        {task?.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TodoList;