export const checkStatus = (response) => {
    console.log(response.status);
    return Promise.resolve(response);
    // if (response.status >= 200 && response.status < 300) {
    //     return Promise.resolve(response);
    // } else if (response.status === 403) {
    //     return Promise.reject(new Error("Vous n'êtes pas autorisé a accéder à ce contenu", response));
    // } else {
    //     return response.text()
    //         .then((param) => {
    //             console.log(param);
    //             return Promise.reject(new Error(param))
    //         })
    // }
};