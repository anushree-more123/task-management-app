import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_EDIT_TASK, UPDATE_TASK_LIST } from "./TaskReducerActionType";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import $ from "jquery";

const AddEditTask = () => {
  const dispatch = useDispatch();
  let modal;
  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    status:
      "In-Progress" /**when we create task 1st time then by default status set as in-progress */,
  };
  const [taskDetails, setTaskDetails] = useState({ ...initialState });
  const [errTaskDetails, setErrTaskDetails] = useState({ ...initialState });
  const { taskList, editTask } = useSelector((state) => state.taskStore);

  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTaskDetails({ ...taskDetails, [name]: value });
    setErrTaskDetails({ ...errTaskDetails, [name]: "" });
  };

  const saveTask = () => {
    let isValid = checkValidation();
    if (isValid) {
      let cpyTaskDetails = { ...taskDetails };
      if (editTask.hasOwnProperty("id")) {
        cpyTaskDetails.id = editTask.id;
        let prevIndex = taskList.findIndex((i) => i.id === editTask.id);
        if (prevIndex > -1) {
          let cpyTaskList = [...taskList];
          cpyTaskList[prevIndex] = { ...cpyTaskDetails };
          dispatch({
            type: UPDATE_TASK_LIST,
            payload: [...cpyTaskList],
          });
        }
      } else {
        cpyTaskDetails.id = uuidv4();
        dispatch({
          type: UPDATE_TASK_LIST,
          payload: [...taskList, cpyTaskDetails],
        });
      }

      /**if success then close the modal */
      $("#close-btn").click();
    }
  };

  const checkValidation = () => {
    let isValid = true;
    let cpyErr = { ...errTaskDetails };
    console.log(taskDetails);
    Object.keys(taskDetails).forEach((key) => {
      if (taskDetails[key].length === 0) {
        cpyErr[key] = `Please enter ${key}`;
        isValid = false;
      }
    });

    /**check due date is past date  */
    if (taskDetails.dueDate.length !== 0) {
      if (moment(taskDetails.dueDate).isBefore(moment().format("YYYY/MM/DD"))) {
        cpyErr.dueDate = "Please select valid due date";
        isValid = false;
      }
    }
    setErrTaskDetails({ ...cpyErr });
    return isValid;
  };

  const closeModal = () => {
    setErrTaskDetails({ ...initialState });
    setTaskDetails({ ...initialState });
    dispatch({ type: UPDATE_EDIT_TASK, payload: {} });
  };

  useEffect(() => {
    if (editTask.hasOwnProperty("id")) {
      setTaskDetails({
        title: editTask.title,
        description: editTask.description,
        dueDate: editTask.dueDate,
        status: editTask.status,
      });
    }
  }, [editTask]);

  return (
    <div id="modal-wrapper">
      <div
        className="modal fade"
        id="taskmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Task
              </h1>
              <button
                type="button"
                id="close-btn"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="modal-body">
              <form className="form-wrapper">
                <div className="form-group">
                  <label>
                    Task Title<sup style={{ color: "red" }}>*</sup>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task title"
                    value={taskDetails.title}
                    name="title"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {errTaskDetails.title && (
                    <small id="titleerror" className="form-text text-danger">
                      {errTaskDetails.title}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label for="exampleFormControlTextarea1">
                    Description<sup style={{ color: "red" }}>*</sup>{" "}
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={taskDetails.description}
                    name="description"
                    onChange={(e) => handleOnChange(e)}
                  ></textarea>
                  {errTaskDetails.description && (
                    <small
                      id="descriptionerror"
                      className="form-text text-danger"
                    >
                      {errTaskDetails.description}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Due Date<sup style={{ color: "red" }}>*</sup>{" "}
                  </label>
                  <input
                    type="Date"
                    className="form-control"
                    value={taskDetails.dueDate}
                    name="dueDate"
                    onChange={(e) => handleOnChange(e)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errTaskDetails.dueDate && (
                    <small id="dueDateerror" className="form-text text-danger">
                      {errTaskDetails.dueDate}
                    </small>
                  )}
                </div>
                {editTask.hasOwnProperty("status") && (
                  <div className="form-group">
                    <label>
                      Select task status<sup style={{ color: "red" }}>*</sup>{" "}
                    </label>

                    <select
                      className="form-select"
                      value={taskDetails.status}
                      name="status"
                      onChange={(e) => handleOnChange(e)}
                    >
                      <option value="In-Progress">In-Progress</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn common-theme-btn"
                onClick={() => saveTask()}
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTask;
