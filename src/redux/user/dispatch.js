import action from "./actions"
import {login} from "../../services/login";
import {createAccount, getAllUser, updateAccount} from '../../services/createAccount';
import {balanceTonToast} from "../toast/dispatch";

export const userLogin = (user, props) => {
    return (dispatch) => {
        login(user)
            .then(response => {
                    dispatch(action.setUser(...response));
                    props.history.push("/moodboard");
                }
            ).catch((error) => {
                console.log(error);
                dispatch(balanceTonToast("error", "Erreur de login"));
                return Promise.reject(error);
        })
    }
};

export const getListUser = () => {
    return (dispatch) => {
        getAllUser()
            .then(response => {
                    dispatch(action.setUsers(response));
            }
            ).catch((error) => {
            console.log(error);
            dispatch(balanceTonToast("error", "Erreur lors de l'ajout"));
            return Promise.reject(error);
        })
    }
};

export const userInscription = (user, id) => {
    return (dispatch) => {
        updateAccount(user, id)
            .then(response => {
                    dispatch(balanceTonToast("success", "Modification réussi"));
                }
            ).catch((error) => {
            console.log(error);
            dispatch(balanceTonToast("error", "Erreur lors de la modification"));
            return Promise.reject(error);
        })
    }
};

export const userUpdate = (user) => {
    return (dispatch) => {
        createAccount(user)
            .then(response => {
                    dispatch(balanceTonToast("success", "Ajout réussi"));
                }
            ).catch((error) => {
            console.log(error);
            dispatch(balanceTonToast("error", "Erreur lors de l'ajout"));
            return Promise.reject(error);
        })
    }
};

export const userConnected = (user) => {
    return (dispatch) => {
        dispatch(action.getUser(user));
    }
};