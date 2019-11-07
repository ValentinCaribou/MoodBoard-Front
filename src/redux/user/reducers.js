import types from "./types";

const defaultState = {
    user: {
        id: '',
        email: '',
        role: '',
        password: '',
        name: '',
        surname: '',
        theme: ''
    },
    users: [],
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case types.SET_USERS:
            return {
                ...state,
                users: action.users,
            };
        case types.GET_USER:
            return action.payload;

        default :
            return state;
    }
};

export default userReducer;