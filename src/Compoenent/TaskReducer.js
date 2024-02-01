import { SET_DELETE_TASK_ID, UPDATE_EDIT_TASK, UPDATE_TASK_LIST } from "./TaskReducerActionType";

const TASK_INITIAL_STATE = {
    taskList: [],
    editTask: {},
    deleteTaskID: ''
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
        default:
            return state;
    }
};
