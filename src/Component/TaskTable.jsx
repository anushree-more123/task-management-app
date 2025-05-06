import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_DELETE_TASK_ID, UPDATE_EDIT_TASK } from "./TaskReducerActionType";
import moment from "moment";

const TaskTable = () => {
  const dispatch = useDispatch();
  const { taskList, searchText, searchResult, searchDate } = useSelector(
    (state) => state.taskStore
  );
  const [list, setList] = useState([]);
  console.log(list);
  /**we persist main taskList so while search we craete
   * new state for data should be available after search operation */
  useEffect(() => {
    setList(
      searchText.length > 0 || searchDate.length > 0
        ? [...searchResult]
        : [...taskList]
    );
  }, [searchText, taskList, searchDate]);

  const statusBadgeClass = {
    "In-Progress": "bg-info text-white",
    Completed: "bg-success text-white",
    Pending: "bg-warning text-dark",
    Failed: "bg-danger text-white",
  };
  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle text-center">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="text-start fw-semibold">{task.title}</td>
              <td className="text-start">{task.description}</td>
              <td>{task.dueDate}</td>
              <td>
                <span
                  className={`badge rounded-pill px-3 py-2 ${
                    statusBadgeClass[task.status] || "bg-secondary"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td style={{ display: "flex", gap: "10px" }}>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#taskmodal"
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch({
                      type: UPDATE_EDIT_TASK,
                      payload: { ...task },
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deletemodal"
                  onClick={() =>
                    dispatch({ type: SET_DELETE_TASK_ID, payload: task.id })
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
