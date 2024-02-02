import {
    SET_DELETE_TASK_ID,
    SET_SEARCH_DATE,
    SET_SEARCH_TEXT, UPDATE_EDIT_TASK,
    UPDATE_SEARCH_RESULT, UPDATE_TASK_LIST
} from "./TaskReducerActionType";

const TASK_INITIAL_STATE = {
    taskList: [],
    editTask: {},
    deleteTaskID: '',
    searchText: '',
    searchResult: [],
    searchDate: '',
};

export default (state = TASK_INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_TASK_LIST:
            return {
                ...state,
                taskList: action.payload,
            };
        case UPDATE_EDIT_TASK:
            return {
                ...state,
                editTask: action.payload,
            };
        case SET_DELETE_TASK_ID:
            return {
                ...state,
                deleteTaskID: action.payload,
            };
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload,
            };
        case UPDATE_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.payload,
            };
        case SET_SEARCH_DATE:
            return {
                ...state,
                searchDate: action.payload,
            };
        default:
            return state;
    }
};
