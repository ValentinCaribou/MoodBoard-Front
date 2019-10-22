import {checkStatus} from "../services/utils";

const url = "http://localhost:3003/inscription";

export function createAccount(user){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type':'application/json',
        }
    }).then(checkStatus)
        .then(response => response.json())
}