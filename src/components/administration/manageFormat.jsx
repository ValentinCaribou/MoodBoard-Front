import React, {Component} from 'react';

import '../../App.scss'
import { getParameters, updateParameters, sendParameters} from "../../services/manageParameters";

import {balanceTonToast} from "../../redux/toast/dispatch";
import {connect} from 'react-redux';
import  { withRouter } from 'react-router-dom'

const formatAvailable = ["pdf","csv"];

class AdminFormat extends Component{

    constructor(props){
        super(props);
        this.state = {
            param : {
                diffusionList : "",
                theme : "",
                formatPreference : "",
                listEmojis : [{
                    code : "",
                    label : "",
                    score : 0
                }]
            },
            isEdit : false,
            isEmpty : false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        getParameters().then( json => {
            console.log(json[0]);
            if (json[0] !== undefined){
                this.setState({param : json[0]});
                this.setState({isEmpty : false});
            } else {
                this.setState({isEmpty : true});
            }
        });
    }

    handleChange(event) {
        let param = this.state.param;
        param.formatPreference = event.target.value;
        this.setState({param});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.saveToDatabase();
      }

    allowEdit = () => {
        this.setState({isEdit : !this.state.isEdit});
    };

    formatDisplay = () => {
        let formats = formatAvailable;
        if(this.state.isEdit === false){
            return(
                <div>
                    <button name="editer" onClick={this.allowEdit} className="button">Editer</button>
                    <br/>
                    <div>
                        {
                            this.state.param !== undefined &&
                            <span className="item-pill">{this.state.param.formatPreference}</span>
                        }
                    </div>
                </div>
            );
        }else{
            return(
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Sauvegarder" className="button"/>
                <input type="button" value="Annuler" onClick={this.allowEdit} className="button"/>
                <br/><br/>
                <select value={this.state.param.formatPreference} onChange={this.handleChange}>
                    <option key={12} value="default" label="Sélectionner un format"/>
                {
                    formats.map((item,index) => {
                        return <option key={index} value={item} label={item}/>;
                    })
                }
                </select>
            </form>
            );
        }
    };

    saveToDatabase = () => {
        const {isEmpty} = this.state;
        this.allowEdit();
        let parameters = this.state.param;
        console.log(JSON.stringify(parameters));
        console.log(isEmpty);
        if (isEmpty){
            sendParameters(parameters)
                .then(response => this.props.dispatch(balanceTonToast("success", "Ajout réussi")))
                .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoi")));
        } else {
            updateParameters(parameters, this.state.param._id)
                .then(response => this.props.dispatch(balanceTonToast("success", "Ajout réussi")))
                .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoi")));
        }
    };

    render(){
        return(
            <div className="parameter-item">
                <p>Choix du format d'exportation du fichier</p>
                <div>
                    {this.formatDisplay()}
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

export default withRouter(connect(mapStateToProps)(AdminFormat));