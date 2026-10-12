import React, { useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../../services/TodoServices";
import EditTodo from "../EditTodo";
import "./Card.css";

const Card = ({ allTask, getUserTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Handle Edit
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task Deleted Successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="task-card-container">
        {allTask?.map((task) => {
          const formattedDate = task?.createdAt
            ? new Date(task.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recently";

          return (
            <div
              className={`modern-task-card ${
                task?.isCompleted ? "card-completed" : "card-pending"
              }`}
              key={task._id}
            >
              {/* Header: Status Chip & Created Date */}
              <div className="card-top-section">
                <span
                  className={`task-status-pill ${
                    task?.isCompleted ? "status-done" : "status-active"
                  }`}
                >
                  <i
                    className={`fa-solid ${
                      task?.isCompleted ? "fa-circle-check" : "fa-clock"
                    }`}
                  ></i>
                  {task?.isCompleted ? "Completed" : "Incomplete"}
                </span>

                <span className="task-date-text">
                  <i className="fa-regular fa-calendar"></i>
                  {formattedDate}
                </span>
              </div>

              {/* Body: Title and Description */}
              <div className="card-body-section">
                <h4
                  className={`task-main-title ${
                    task?.isCompleted ? "completed-title" : ""
                  }`}
                  title={task?.title}
                >
                  {task?.title}
                </h4>
                <p className="task-description-text">
                  {task?.description || "No description provided."}
                </p>
              </div>

              {/* Footer: Action Controls */}
              <div className="card-action-bar">
                <button
                  type="button"
                  className="card-btn edit-action-btn"
                  title="Edit Task"
                  onClick={() => handleEdit(task)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  className="card-btn delete-action-btn"
                  title="Delete Task"
                  onClick={() => handleDelete(task._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Render Edit Modal */}
      {showModal && selectedTask && (
        <EditTodo
          task={selectedTask}
          setShowModal={setShowModal}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;