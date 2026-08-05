import React from 'react'
import { data } from 'react-router-dom'
import  toast from 'react-hot-toast'
import TodoServices from '../../services/TodoServices'

const PopModel =  ({
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
  getUserTask,
}) => {

    // handle close

    const handleclose = () => {setShowModal(false)}

    //  handle submit

  const handleSubmit = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    const createdBy = userData?.user?._id;

    const data = {
      title,
      description,
      createdBy,
    };

    if (!title || !description) {
      return toast.error("Please provide title and description");
    }

    const res = await TodoServices.createTodo(data);
    console.log("Create API Response:", res.data);

    console.log("Before getUserTask()");
    await getUserTask();
    console.log("After getUserTask()");

    setShowModal(false);
    toast.success("Task created successfully");

    setTitle("");
    setDescription("");
  } catch (error) {
    console.log("Full Error:", error);
    console.log("Response:", error.response);
    console.log("Response Data:", error.response?.data);

    toast.error(error.response?.data?.message || error.message);
  }
};
  return (
   <>
   {showModal&& ( 
   <div className="modal" tabIndex="-1" role='dialog' style={{display:'block', backgroundColor:'rgba(0,0,0,0.5)'}}>
     <div className="modal-dialog" role='document'>
        <div className="modal-content">
            <div className="modal-header">
                <h5 className='modal-title'>
                    Add New Task
                </h5>
                <button className='btn-close' aria-label='close' onClick={handleclose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="mb-3">
                    <label className="form-label" > Title </label>
                        <input type="text" className='form-control' value={title} onChange={(e) => setTitle(e.target.value)}  />
                     </div>
                     <div className="form-floating">
                        <textarea  className='form-control' id="floatingTextarea" value={description} onChange={(e) => setDescription(e.target.value)}  ></textarea>
                        <label htmlFor="floatingTextarea">Description</label>
                     </div>
            </div>
            <div className="modal-footer">
                <button type='button' className='btn btn-secondary' onClick={handleclose}>Close</button>
                <button type='button' className='btn btn-primary' onClick={handleSubmit} >Create</button>
            </div>
        </div>
     </div>
   </div>
   )}
   </>
  )
}

export default PopModel