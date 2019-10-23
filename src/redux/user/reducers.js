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
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case types.GET_USER:
            return action.payload;

        default :
            return state;
    }
};

export default userReducer;