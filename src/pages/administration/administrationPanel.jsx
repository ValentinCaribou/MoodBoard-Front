import React, {Component} from 'react';

//COMPONENTS
import Admin from '../../components/administration/manageEmails';
import AdminUser from '../../components/administration/manageUsers';

//CSS
import '../../App.scss';
import './administrationPanel.scss';

//COMPONENTS REDUX
import {connect} from 'react-redux';
import  { withRouter } from 'react-router-dom'

class AdminPanel extends Component{

    componentDidMount(){
        /**const {user} = this.props;
        if(user.email === ""){
            this.props.history.push("/");
        }*/
    }

    render(){
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Administration des paramètres</h1>
                    <a href="./moodboard">Return</a>
                    {/*<Admin/>*/}
                    <AdminUser/>
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