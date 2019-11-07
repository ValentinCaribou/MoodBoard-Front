import React, {Component} from 'react';

//COMPONENTS
import ManageEmailComponent from '../../components/administration/manageEmails';
import ManageFormatComponent from '../../components/administration/manageFormat';
import ManageEmojisComponent from '../../components/administration/manageEmojis';
import ManageUsersComponent from '../../components/administration/manageUsers';

//CSS
import '../../App.scss';
import '../../App-bleu.scss';
import './administrationPanel.scss';

//COMPONENTS REDUX
import {connect} from 'react-redux';
import  { withRouter } from 'react-router-dom'

class AdminPanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            manageEmail : false,
            manageUsers : false,
            manageThemes : false,
            manageEmojis : false,
            isActive : true,
            AppHeader: 'App-header'
        }
    }

    componentDidMount(){
        const {user} = this.props;
        if(user.email === ""){
            this.props.history.push("/");
        }
        if(user.theme !== "" && user.theme !== "default"){
            this.setState({AppHeader: 'App-header-bleu'})
        }
    }

    render(){
        return (
            <div className="App">
                <div className={this.state.AppHeader}>
                <span><a href="./moodboard">Retour</a></span>
                    <span>Administration des paramètres</span>
                    <div className="grid-container">
                    {/**<div className="menu-bar">

                        </div>
                        <div className="fragment-display">

                    </div>*/}
                    <div className="parameter-container">
                        <ManageUsersComponent/>
                        <ManageFormatComponent/>
                        <ManageEmailComponent/>
                        <ManageEmojisComponent/>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};

export default withRouter(connect(mapStateToProps)(AdminPanel));