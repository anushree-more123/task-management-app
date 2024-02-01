import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_DELETE_TASK_ID, UPDATE_EDIT_TASK } from "./TaskReducerActionType";

const TaskTable = () => {
  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.taskStore);
  console.log(taskList);
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
        {taskList.map((value, index) => (
          <tr key={`task-${value.id}`}>
            <th scope="row">{index + 1}</th>
            <td>{value.title}</td>
            <td>{value.description}</td>
            <td>{value.dueDate}</td>
            <td>{value.status}</td>
            <td style={{ display: "flex", gap: "10px" }}>
              <button
                data-bs-toggle="modal"
                data-bs-target="#taskmodal"
                className="btn btn-primary"
                onClick={() => {
                  dispatch({ type: UPDATE_EDIT_TASK, payload: { ...value } });
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
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
