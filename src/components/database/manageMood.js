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