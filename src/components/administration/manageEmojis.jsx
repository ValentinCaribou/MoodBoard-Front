import React, {Component} from 'react';

import '../../App.scss'
import { getParameters, updateParameters } from '../database/manageParameters';

import {balanceTonToast} from "../../redux/toast/dispatch";
import {connect} from 'react-redux';
import  { withRouter } from 'react-router-dom'

class AdminEmojis extends Component{

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
                    score : ""
                }]
            },
            isEdit : false,
            emojisToAdd : ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        getParameters().then( json => {
            this.setState({param : json[0]});
            let emojis = "";
                json[0].listEmojis.map(item => {
                    emojis += "{"+item.code+","+item.label+","+item.score+"}";
                    this.setState({emojisToAdd : emojis});
                    return null;
                })
                return null;
        });
    }

    handleChange(event) {
        let emojis = event.target.value;
        this.setState({emojisToAdd : emojis});
      }
    
    handleSubmit(event) {
        event.preventDefault();
        let param = this.state.param;
        param.listEmojis.splice(0);

        let emojisSplitted = this.state.emojisToAdd.split(";");
        emojisSplitted.map(item =>{
            let itemSplit = item.replace("{","").replace("}","").split(",");
            param.listEmojis.push({code : itemSplit[0], label : itemSplit[1], score : itemSplit[2]});
            return null;
        })

        this.setState({param});
        this.saveToDatabase();
    }

    cancelChanges = () => {
        this.allowEdit();
    }

    allowEdit = () => {
        this.setState({isEdit : !this.state.isEdit});
    }

    emojisDisplay = () => {
        if(this.state.isEdit === false){
            return(
                <div>
                    <button name="editer" onClick={this.allowEdit} className="button">Editer</button>
                    <br/>
                    <div>
                    {
                        this.state.param.listEmojis !== undefined
                        ? this.state.param.listEmojis.map(item => {
                            let code = item.code;
                            return(
                                <span className="item-pill">
                                    <span aria-label={item.label.toString}>{code}</span>
                                </span>
                            );
                        })
                        : <span>aucune données trouvées</span>
                        
                    }
                    </div>
                </div>
            );
        }else{
            return(
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Sauvegarder" className="button"/>
                <input type="button" value="Annuler" onClick={this.cancelChanges} className="button"/>
                <br/><br/>
                <p className="infos">
                    Chaque emoji doit etre entouré d'accolades {'{ }'}, 
                    paramétré comme suit : code UTF-16 de l'émoji, dénomination, score.
                    Exemple : {'{00134,content,1};{};{};...'}
                    La liste complète des émojis se trouve sur 
                    <a href="https://unicode.org/emoji/charts/full-emoji-list.html"> unicode.org</a>
                </p>
                <textarea cols="50" rows="10" value={this.state.emojisToAdd} onChange={this.handleChange}/>
            </form>
            );
        }
    }

    saveToDatabase = () => {
        this.allowEdit();
        let parameters = this.state.param;
        updateParameters(parameters, this.state.param._id)
            .then(response => this.props.dispatch(balanceTonToast("success", "Ajout réussi")))
            .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoi")));
    }

    render(){
        return(
            <div className="parameter-item">
                <p>Liste des emojis</p>
                <div>
                    {this.emojisDisplay()}
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

export default withRouter(connect(mapStateToProps)(AdminEmojis));