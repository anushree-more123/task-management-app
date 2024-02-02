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

  /**we persist main taskList so while search we craete
   * new state for data should be available after search operation */
  useEffect(() => {
    setList(
      searchText.length > 0 || searchDate.length > 0
        ? [...searchResult]
        : [...taskList]
    );
  }, [searchText, taskList, searchDate]);

  return (
    <table className="table table-striped shadow-sm p-3 mb-5 bg-white rounded">
      <thead>
        <tr>
          <th scope="col">Sr no.</th>
          <th scope="col">Task Title</th>
          <th scope="col">Description</th>
          <th scope="col">Due Date</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.length === 0 ? (
          <tr>
            <td colSpan={6} align="center">
              No task found!
            </td>
          </tr>
        ) : (
          list.map((value, index) => (
            <tr key={`task-${value.id}`}>
              <th scope="row">{index + 1}</th>
              <td>{value.title}</td>
              <td>{value.description}</td>
              <td>{moment(value.dueDate).format("DD MMM YYYY")}</td>
              <td>
                {value.status === "In-Progress" ? (
                  <span className="status-inprogress">{value.status}</span>
                ) : value.status === "Completed" ? (
                  <span className="status-completed">{value.status}</span>
                ) : (
                  value.status === "Pending" && (
                    <span className="status-pending">{value.status}</span>
                  )
                )}
              </td>
              <td style={{ display: "flex", gap: "10px" }}>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#taskmodal"
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch({
                      type: UPDATE_EDIT_TASK,
                      payload: { ...value },
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
                    dispatch({ type: SET_DELETE_TASK_ID, payload: value.id })
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TaskTable;
