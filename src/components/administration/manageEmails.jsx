import React, {Component} from 'react';

import '../../App.scss'
import { getParameters, updateParameters } from '../database/manageParameters';

import {balanceTonToast} from "../../redux/toast/dispatch";
import {connect} from 'react-redux';
import  { withRouter } from 'react-router-dom'

class AdminEmail extends Component{

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
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        getParameters().then( json => {
            this.setState({param : json[0]});
        });
    }

    handleChange(event) {
        console.log(event.target.value);
        let param = this.state.param;
        param.diffusionList = event.target.value;
        console.log(param);
        this.setState({param});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.value);
        this.saveToDatabase();
      }

    allowEdit = () => {
        this.setState({isEdit : !this.state.isEdit});
    }

    emailDisplay = () => {
        let emails = [];
        emails = this.state.param.diffusionList.split(";");
        if(this.state.isEdit === false){
            return(
            <div>
                <button name="editer" onClick={this.allowEdit} className="button">Editer</button>
                <br/>
                <div>
                {
                    emails.map(item => {
                        return <span className="email-item-card">{item}</span>;
                    })
                }
                </div>
            </div>);
        }else{
            return(
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Sauvegarder" className="button"/>
                <input type="button" value="Annuler" onClick={this.allowEdit} className="button"/>
                <br/><br/>
                <textarea cols="50" rows="10" value={this.state.param.diffusionList} onChange={this.handleChange}/>
            </form>
            );
        }
    }

    saveToDatabase = () => {
        this.allowEdit();
        let parameters = this.state.param;
        console.log(JSON.stringify(parameters));
        updateParameters(parameters, this.state.param._id)
            .then(response => this.props.dispatch(balanceTonToast("success", "Ajout réussi")))
            .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoi")));
    }

    render(){
        return(
            <div className="parameter-item">
                <p>Liste de diffusion des emails</p>
                <div>
                    {this.emailDisplay()}
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

export default withRouter(connect(mapStateToProps)(AdminEmail));