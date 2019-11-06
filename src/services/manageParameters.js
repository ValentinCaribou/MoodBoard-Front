import {checkStatus} from "../services/utils";

const url = "http://localhost:4000/administrate";

export function getParameters(){
    return fetch(url, {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
        }
    }).then(checkStatus)
        .then(response => response.json())
}

export function updateParameters(params, id){

    console.log(params);
    return fetch(url+"/"+id, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
            'Content-Type':'application/json',
        }
    }).then(checkStatus)
        .then(response => {
            response.json();
            console.log(response);
        })
}

export function sendParameters(params){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type':'application/json',
        }
    }).then(checkStatus)
        .then(response => {
            response.json();
            console.log(response);
        })
}