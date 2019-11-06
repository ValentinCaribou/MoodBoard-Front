import React, {Component} from 'react';

import '../../App.scss'
import {getParameters, sendParameters, updateParameters} from "../../services/manageParameters"

import {balanceTonToast} from "../../redux/toast/dispatch";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class AdminEmail extends Component{

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
        param.diffusionList = event.target.value;
        this.setState({param});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.saveToDatabase();
      }

    allowEdit = () => {
        this.setState({isEdit : !this.state.isEdit});
    };

    emailDisplay = () => {
        if (this.state.param === undefined){
            let param = {
                    diffusionList : "",
                    theme : "",
                    formatPreference : "",
                    listEmojis : [{
                        code : "",
                        label : "",
                        score : 0
                    }]
                };
                this.setState({param});
        }
        let emails = this.state.param.diffusionList.split(";");
        if(emails.length !== 0){
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
            } else {
                return(
                    <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Sauvegarder" className="button"/>
                        <input type="button" value="Annuler" onClick={this.allowEdit} className="button"/>
                        <br/><br/>
                        <textarea cols="50" rows="10" value={this.state.param.diffusionList} onChange={this.handleChange}/>
                        <p className="infos">
                            Vous pouvez ajouter une ou plusieurs adresses, toutes séparées par un ";".
                            Le dernier email entré ne doit pas contenir de ";" à la fin.
                        </p>
                    </form>
                );
            }
        }
    };

    saveToDatabase = () => {
        const {isEmpty} = this.state;
        this.allowEdit();
        let parameters = this.state.param;
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