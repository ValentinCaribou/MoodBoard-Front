import React, {Component} from 'react';

import '../../App.scss'
import './manage.scss'
import {getAllUser, updateAccount} from "../../services/createAccount";

import {connect} from 'react-redux';
import { Switch } from '@material-ui/core';
import { withRouter } from 'react-router-dom'

class AdminUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            param : {
                diffusionList : "",
                theme : "",
                formatPreference : "",
                listEmojis : ""
            },
            isEdit : false,
            users: [],
            checked: true,
        };
    }

    componentDidMount(){
        getAllUser().then(r => {
            this.setState({users: r})
        });
    }

    toggleChecked = (e) => {
        const {users} = this.state;
        const target = e.currentTarget;
        let user = users.find(user => user._id === target.id);
        if(user.role === "USER"){
            user.role = "ADMIN"
        } else {
            user.role = "USER"
        }
        updateAccount(user, target.id).then(r => console.log(r));
        this.setState({checked: !this.state.checked})
    };


    render(){
        const {users} = this.state;
        return(
            <div className="parameter-item">
                <p>Liste des utilisateurs : </p>
                <div className="email-item">
                    <div className={"email-title"}>
                        <span className={"label-affichage-mail"}>Adresse mail : </span>
                    </div>
                    <div className={"switch-title"}>
                        <span className={"label-affichage-mail"}>Utilisateur / Administrateur </span>
                    </div>
                </div>
                {
                    users.map((user) => {
                        return <div key={user._id} className="email-item">
                            <div>
                                <span className={"label-affichage-mail"}>{user.email}</span>
                            </div>
                            <div className={"switch-item"}>
                                <Switch id={user._id} checked={(user.role === "USER") ? false : true} onChange={this.toggleChecked} />
                            </div>
                        </div>
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.userReducer.users,
    }
};

export default withRouter(connect(mapStateToProps)(AdminUser));