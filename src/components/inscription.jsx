import React, {Component} from 'react';

export default class Week extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="border">
                        <div className="div-close">
                            <span className="close" onClick={this.props.changeStatus}>&times;</span>
                        </div>
                        <div>
                            <span>Adresse mail : </span>
                            <input type="text"  onChange={this.handleOnChange}></input>
                        </div>
                        <div>
                            <span>Mot de passe : </span>
                            <input type="password"  onChange={this.handleOnChange}></input>
                        </div>
                        <div>
                            <span>Confirmer le mot de passe : </span>
                            <input type="password"  onChange={this.handleOnChange}></input>
                        </div>
                        <div>
                            <span>Nom : </span>
                            <input type="text"  onChange={this.handleOnChange}></input>
                        </div>
                        <div>
                            <span>Prenom : </span>
                            <input type="text"  onChange={this.handleOnChange}></input>
                        </div>
                        <input type="submit" className="validate-button" value="Créer le compte" onClick={this.changeHide}/>
                    </div>
                </div>
            </div>
        )
    }
}