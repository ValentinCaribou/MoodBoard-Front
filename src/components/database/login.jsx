import React, {Component} from 'react';
import credentialsMock from './mocks/mock-credentials.json';

export default class Login extends Component{

    checkLoginCredentials = (login, password) => {
        const users = credentialsMock.login;
        users.filter(user => {
            return user.username.includes(login) && user.password.includes(password)
        });
    };

    saveUserToDatabase = (user) => {
        console.log(user);
        const res = {
            ...credentialsMock,
            login:{
                ...credentialsMock.login,
                ArrayObject:[
                    ...credentialsMock.login.ArrayObject,
                    user
                ]
            }
        }
         console.log(res)
    }

    static saveUserToDatabase(user) {
        console.log(user);
        const res = JSON.parse(credentialsMock.login);
        console.log(res);
        res.push(user);
        credentialsMock = res;
        console.log(res);
        return true;
    }
}