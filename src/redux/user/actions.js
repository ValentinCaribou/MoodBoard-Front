import types from "./types";

const setUser = (user) =>
    ({
        type: types.SET_USER,
        user
    });

const getUser = (user) => ({
    type: types.GET_USER,
    payload: user,
});

export default {
    setUser,
    getUser
}