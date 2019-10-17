import React, {Component} from 'react';
import './inscription.scss'

export default class Week extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {
                adresseMail:"",
                password:"",
                confirmePassword:"",
                nom:"",
                prenom:""
            },
            isError: false,
            errorMessage: ""
        }
    }

    handleOnChange = (e) => {
        const target = e.currentTarget;
        this.persistUser(target.id, target.value);
    };

    persistUser = (name, value) => {
        const user = {...this.state.user};
        user[name] = value;
        this.setState({user});
    };

    validateEmail(email) {
        const regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexMail.test(String(email).toLowerCase());
    }

    validateInscription = () => {
        const user = this.state.user;
        let valide = this.validateEmail(user.adresseMail);
        if (user.adresseMail.trim() !== ""
            && user.password.trim() !== ""
            && user.confirmePassword.trim() !== ""
            && user.nom.trim() !== ""
            && user.prenom.trim() !== ""){
            console.log(valide);
            if (valide){
                if(user.password !== user.confirmePassword){
                    this.setState({errorMessage: "Les mots de passe doivent être identique"});
                    this.setState({isError: true});
                } else {
                    this.setState({isError: false});
                }
            } else {
                this.setState({errorMessage: "Adresse mail non valide"});
                this.setState({isError: true});
            }
        } else {
            this.setState({errorMessage: "Veuillez remplir tous les champs"});
            this.setState({isError: true});
        }
    };

    render() {
        const {user, isError, errorMessage} = this.state;
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="border">
                        <div className="centered">
                            <div className="div-close">
                                <span className="close" onClick={this.props.changeStatus}>&times;</span>
                            </div>
                            {
                                isError &&
                                <div className="group">
                                    <label>{errorMessage}</label>
                                </div>
                            }
                            <div className="group">
                                <input type="text" id="adresseMail" className="inputText" required="required" onChange={this.handleOnChange} value={user.adresseMail}/>
                                <label htmlFor="adresseMail">Adresse mail</label>
                                <div className="bar"></div>
                            </div>
                            <div className="group">
                                <input type="password" id="password" className="inputText" required="required" onChange={this.handleOnChange} value={user.password}/>
                                <label htmlFor="password">Mot de passe</label>
                                <div className="bar"></div>
                            </div>
                            <div className="group">
                                <input type="password" id="confirmePassword" className="inputText" required="required" onChange={this.handleOnChange} value={user.confirmePassword}/>
                                <label htmlFor="confirmePassword">Confirmer le mot de passe : </label>
                                <div className="bar"></div>
                            </div>
                            <div className="group">
                                <input type="text" id="nom" className="inputText" required="required" onChange={this.handleOnChange} value={user.nom}/>
                                <label htmlFor="nom">Nom : </label>
                                <div className="bar"></div>
                            </div>
                            <div className="group">
                                <input type="text" id="prenom" className="inputText" required="required" onChange={this.handleOnChange} value={user.prenom}/>
                                <label htmlFor="prenom">Prenom : </label>
                                <div className="bar"></div>
                            </div>
                            <input type="submit" className="validate-button" value="Créer le compte" onClick={this.validateInscription}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}