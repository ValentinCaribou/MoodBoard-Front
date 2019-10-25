import React, {Component} from 'react';
import './acceuilModal.scss'
import {connect} from "react-redux";
import  { withRouter } from 'react-router-dom'
import Connexion from "./connexion/connexion";
import {userLogin, userInscription} from "../../redux/user/dispatch";
import Inscription from "./inscription/inscription";

class AcceuilModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user : {
                email:"",
                password:"",
                confirmePassword:"",
                name:"",
                surname:""
            },
            userFinal : {
                email:"",
                password:"",
                name:"",
                surname:""
            },
            userConnexion : {
                email: "",
                password: ""
            },
            isError: false,
            errorMessage: "",
            connexion: true,
            inscription: false,
            isActive: true
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

    changeStatusConnexion = () => {
        this.setState({connexion: true});
        this.setState({inscription: false});
        this.setState({isActive: !this.state.isActive});
    };

    changeStatusInscription = () => {
        this.setState({connexion: false});
        this.setState({inscription: true});
        this.setState({isActive: !this.state.isActive});
    };

    validateInscription = () => {
        const user = this.state.user;
        let valide = this.validateEmail(user.email);
        if (user.email.trim() !== ""
            && user.password.trim() !== ""
            && user.confirmePassword.trim() !== ""
            && user.name.trim() !== ""
            && user.surname.trim() !== ""){
            if (valide){
                if(user.password !== user.confirmePassword){
                    this.setState({errorMessage: "Les mots de passe doivent être identique"});
                    this.setState({isError: true});
                } else {
                    let newUser = {
                        email: user.email,
                        password: user.password,
                        name: user.name,
                        surname: user.surname,
                    };
                    this.props.dispatch(userInscription(newUser));
                    this.setState({isError: false});
                    this.props.changeStatus();
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

    connexion = () => {
        let userConnexion = this.state.userConnexion;
        userConnexion.email = this.state.user.email;
        userConnexion.password = this.state.user.confirmePassword;
        if (userConnexion.email.trim() !== "" && userConnexion.password.trim() !== ""){
            let valide = this.validateEmail(userConnexion.email);
            if(valide){
                this.setState({userConnexion});
                this.props.dispatch(userLogin(userConnexion, this.props));
            } else {
                this.setState({errorMessage: "Adresse mail non valide"});
                this.setState({isError: true});
            }
        }
    };

    render() {
        const {user, isError, errorMessage, connexion, inscription, isActive} = this.state;
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="border">
                        <div className="centered">
                            <div className="div-close">
                                <span className="close" onClick={this.props.changeStatus}>&times;</span>
                            </div>
                            <div>
                                <input type="submit" className={isActive ? "connexion-button-active" : "connexion-button"} value="Connexion" onClick={this.changeStatusConnexion}/>
                                <input type="submit" className={isActive ? "connexion-button" : "connexion-button-active"} value="Inscription" onClick={this.changeStatusInscription}/>
                            </div>
                            {
                                isError &&
                                <div className="group">
                                    <label>{errorMessage}</label>
                                </div>
                            }
                            {
                                inscription &&
                                <Inscription
                                    user={user}
                                    handleOnChange={this.handleOnChange}
                                    validateInscription={this.validateInscription}
                                />
                            }
                            {
                                connexion &&
                                <Connexion
                                    user={user}
                                    handleOnChange={this.handleOnChange}
                                    connexion={this.connexion}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};

export default withRouter(connect(mapStateToProps)(AcceuilModal));