import React, { useEffect, useState, useCallback } from "react";
import Navbar from '../../components/layout/Navbar'
import PopModel from '../../components/layout/PopModel'
import TodoServices from '../../services/TodoServices'
import Card from "../../components/card/Card"
import Spinner from '../../components/Spinner'
import './HomePage.css'

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  // modal trigger
  const openModalHandler = () => {
    setShowModal(true);
  };

  // user data
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData?.user?._id;

  const getUserTask = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setLoading(false);
      setAllTask(data?.todos || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getUserTask();
  }, [getUserTask]);

  // Non-destructive search filter (retaining original list upon backspace)
  const filteredTasks = allTask?.filter((item) =>
    item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = allTask?.filter(t => t?.isCompleted)?.length || 0;

  return (
    <div className="home-page-wrapper">
      <Navbar />

      <main className="container home-container">
        {/* Top Header & Action Controls */}
        <div className="home-header">
          <div className="home-header-title">
            <h1>Your Tasks</h1>
            <p>
              {allTask.length > 0 ? (
                <>Completed <b>{completedCount}</b> of <b>{allTask.length}</b> tasks</>
              ) : (
                "Track, prioritize, and conquer your goals"
              )}
            </p>
          </div>

          <div className="home-controls">
            <div className="search-box">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="search"
                className="home-search-input"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="clear-search-btn" 
                  onClick={() => setSearchQuery("")}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            <button className="create-btn" onClick={openModalHandler}>
              <span>Create Task</span>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        {/* Task Cards & States */}
        {loading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : filteredTasks && filteredTasks.length > 0 ? (
          <Card allTask={filteredTasks} getUserTask={getUserTask} />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fa-regular fa-folder-open"></i>
            </div>
            <h3>{searchQuery ? "No matching tasks found" : "No tasks yet"}</h3>
            <p>
              {searchQuery
                ? "We couldn't find anything matching your search query. Try typing something else!"
                : "You don't have any tasks scheduled. Tap Create Task above to get started!"}
            </p>
            {!searchQuery && (
              <button className="empty-state-btn" onClick={openModalHandler}>
                Add your first task
              </button>
            )}
          </div>
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
      </main>
    </div>
  );
};

export default HomePage;