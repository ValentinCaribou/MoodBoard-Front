import React, {Component} from 'react';
import './inscription.scss'

export default class Week extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="border">
                        <div className="centered">
                            <div className="div-close">
                                <span className="close" onClick={this.props.changeStatus}>&times;</span>
                            </div>
                            <div className="group">
                                <input type="text" id="adresseMail" className="inputText" required="required"/><label
                                htmlFor="adresseMail">Adresse mail</label>
                                <div className="bar"></div>
                            </div>
                            <div className="group">
                                <input type="password" id="password" className="inputText" required="required" onChange={this.handleOnChange}></input>
                                <label htmlFor="password">Mot de passe</label>
                                <div className="bar"></div>
                            </div>
                            <div className="group">
                                <input type="password" id="confirmePassword" className="inputText" required="required" onChange={this.handleOnChange}></input>
                                <label htmlFor="confirmePassword">Confirmer le mot de passe : </label>
                                <div className="bar"></div>
                            </div>
                            <div className="group">
                                <input type="text" id="nom" className="inputText" required="required" onChange={this.handleOnChange}></input>
                                <label htmlFor="nom">Nom : </label>
                                <div className="bar"></div>
                            </div>
                            <div className="group">
                                <input type="text" id="prenom" className="inputText" required="required" onChange={this.handleOnChange}></input>
                                <label htmlFor="prenom">Prenom : </label>
                                <div className="bar"></div>
                            </div>
                            <input type="submit" className="validate-button" value="Créer le compte" onClick={this.changeHide}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}