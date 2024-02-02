import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_SEARCH_DATE,
  SET_SEARCH_TEXT,
  UPDATE_SEARCH_RESULT,
} from "./TaskReducerActionType";
import moment from "moment";

const ActionHeaderComp = () => {
  const dispatch = useDispatch();
  const { taskList, searchText, searchDate } = useSelector(
    (state) => state.taskStore
  );

  const handleSearchTask = (text) => {
    dispatch({ type: SET_SEARCH_TEXT, payload: text });
    let cpyTaskList = [...taskList];
    dispatch({
      type: UPDATE_SEARCH_RESULT,
      payload: cpyTaskList.filter((e) =>
        e.title.toLowerCase().includes(text.toLowerCase())
      ),
    });
  };

  const handleSearchTaskByDate = (date) => {
    dispatch({ type: SET_SEARCH_DATE, payload: date });
    let cpyTaskList = [...taskList];
    dispatch({
      type: UPDATE_SEARCH_RESULT,
      payload: cpyTaskList.filter((item) =>
        moment(item.dueDate).isSame(date, "day")
      ),
    });
  };

  const handleResetSearch = () => {
    dispatch({ type: SET_SEARCH_DATE, payload: "" });
    dispatch({ type: SET_SEARCH_TEXT, payload: "" });
  };

  return (
    <div className="action-header-wrapper">
      <div className="form-group d-flex" style={{ gap: "10px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search task by title"
          value={searchText}
          onChange={(e) => handleSearchTask(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          placeholder="Search task by due date"
          value={searchDate}
          onChange={(e) => handleSearchTaskByDate(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => handleResetSearch()}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      <button
        type="button"
        className="btn common-theme-btn"
        data-bs-toggle="modal"
        data-bs-target="#taskmodal"
      >
        Add Task
      </button>
    </div>
  );
};

export default ActionHeaderComp;
