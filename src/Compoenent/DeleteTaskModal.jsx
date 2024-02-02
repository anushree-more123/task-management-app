import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_DELETE_TASK_ID, UPDATE_TASK_LIST } from "./TaskReducerActionType";

const DeleteTaskModal = () => {
  const dispatch = useDispatch();
  const { deleteTaskID, taskList } = useSelector((state) => state.taskStore);

  const handleDeleteTask = () => {
    let cpyTaskList = [...taskList];
    dispatch({
      type: UPDATE_TASK_LIST,
      payload: [...cpyTaskList.filter((e) => e.id !== deleteTaskID)],
    });
    closeDeleteModal();
  };
  const closeDeleteModal = () => {
    dispatch({ type: SET_DELETE_TASK_ID, payload: "" });
  };

  return (
    <div
      className="modal fade"
      id="deletemodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              Are you sure?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeDeleteModal}
            ></button>
          </div>
          <div className="modal-body">Do you want to delete this task!</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => handleDeleteTask()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
