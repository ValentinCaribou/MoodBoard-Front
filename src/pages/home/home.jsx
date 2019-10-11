import React, {Component}  from 'react';
import '../../App.scss';
import Soucoupe from "../../assets/app_launch_button3.png"
import Fungenieur from "../../assets/logo_fungenieur.png"

export default class Home extends Component {
    render() {
        return (
            <div className="App">
                <header>
                </header>
                <div className="App-header">
                    <img src={Fungenieur}/>
                    <a className="bouton-accueil" href="/moodboard"><input className="image" type="image" src={Soucoupe}/></a>
                </div>
            </div>
        );
    }
};
