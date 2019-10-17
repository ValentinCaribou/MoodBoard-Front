import React, {Component} from 'react';
import credentialsMock from './mocks/mock-credentials.json';

export default class Login extends Component{

    checkLoginCredentials = (login, password) => {
        const users = credentialsMock.login;
        users.filter(user => {
            return user.username.includes(login) && user.password.includes(password)
        });
    }
}