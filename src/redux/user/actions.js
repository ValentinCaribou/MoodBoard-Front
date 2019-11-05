import types from "./types";

const setUser = (user) =>
    ({
        type: types.SET_USER,
        user
    });

const setUsers = (users) =>
    ({
        type: types.SET_USERS,
        users
    });

const getUser = (user) => ({
    type: types.GET_USER,
    payload: user,
});

export default {
    setUser,
    setUsers,
    getUser
}