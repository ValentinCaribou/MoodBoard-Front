import React, {Component}  from 'react';
import '../../App.scss';
import Soucoupe from "../../assets/app_launch_button3.png"
import Fungenieur from "../../assets/logo_fungenieur.png"
import Login from "../../components/database/login"

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHide : true,
        }
    }

    changeHide = () => {
        this.setState({isHide: !this.state.isHide});
    };

    handleOnChange = () => {

    };

    render() {
        let {isHide} = this.state;
        return (
            <div className="App">
                <header>
                </header>
                <div className="App-header">
                    <img src={Fungenieur}/>
                    {
                        !isHide &&
                        <div id="myModal" className="modal">
                            <div className="modal-content">
                                <div className="border">
                                    <div>
                                        <Login checkLoginCredentials/>
                                    </div>
                                    <div className="div-close">
                                        <span className="close" onClick={this.changeHide}>&times;</span>
                                    </div>
                                    <div>
                                        <span>Adresse mail : </span>
                                        <input type="text" onChange={this.handleOnChange}></input>
                                    </div>
                                    <div>
                                        <span>Adresse mail : </span>
                                        <input type="text" onChange={this.handleOnChange}></input>
                                    </div>
                                    <input type="submit" className="validate-button" value="Créer le compte" onClick={this.changeHide}/>
                                </div>
                            </div>
                        </div>
                    }
                    <input className="bouton-accueil image" onClick={this.changeHide} type="image" src={Soucoupe}/>
                </div>
            </div>
        );
    }
};
