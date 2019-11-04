import React, {Component} from 'react';

import '../../App.scss'
import { getParameters} from '../../services/manageParameters';
import {getAllUser} from "../../services/createAccount";

import {connect} from 'react-redux';
import  { withRouter } from 'react-router-dom'

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
            isEdit : false
        };
    }

    componentDidMount(){
        getAllUser().then(r => console.log(r));
    }

    render(){
        return(
            <div className="parameter-item">
                <p>Liste des utilisateurs</p>
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