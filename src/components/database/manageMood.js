const url = "http://localhost:3003/mood";

export function sendMood(mood){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(mood),
        headers: {
            'Content-Type':'application/json',
        }
    })
}

export function updateMood(mood, id){
    return fetch(url + "/" + id,  {
        method: 'PUT',
        body: JSON.stringify(mood),
        headers: {
            'Content-Type':'application/json',
        }
    })
}

export function getAll(){
    return fetch(url, {
        method:'GET',
        headers: {
            'Content-Type':'application/json',
        }
    }).then(response =>
        response.json()
    )
}