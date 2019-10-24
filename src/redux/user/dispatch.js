import action from "./actions"
import {login} from "../../components/database/login";
import {createAccount} from '../../components/database/createAccount';
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

export const userInscription = (user) => {
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