import types from "./types";

const defaultState = {
    user: {
        id: '',
        email: '',
        password: '',
        name: '',
        surname: ''
    }
};

const userReducer = (state = defaultState, action) => {
    if (action.type === types.SET_USER) {
        return {
            ...state,
            user: action.user,
        };
    } else {
        return state;
    }
};

export default userReducer;