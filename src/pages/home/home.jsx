import React, {Component}  from 'react';
import '../../App.scss';
import Soucoupe from "../../assets/app_launch_button3.png"

export default class Home extends Component {
    render() {
        return (
            <div className="App">
                <header>
                </header>
                <body className="App-header">
                <div className="title">
                    <span className="oval">#MOOD</span>
                    <span>GENIEUR</span>
                </div>
                    <a className="bouton-accueil" href="/accueil"><input className="image" type="image" src={Soucoupe}/></a>
                </body>
            </div>
        );
    }
};
