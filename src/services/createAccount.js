import {checkStatus} from "./utils";

const url = "http://localhost:4000/inscription";

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

export function updateAccount(user, id){
    return fetch(url + "/" + id,  {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type':'application/json',
        }
    }).then(checkStatus)
        .then(response => response.json())
}

export function getAllUser(){
    return fetch(url, {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
        }
    }).then(checkStatus)
        .then(response => response.json())
}