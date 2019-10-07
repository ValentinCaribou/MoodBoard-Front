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
                    <h1 className="title">#MoodGenieur</h1>
                    <a href="/accueil"><input className="image" type="submit" value="Accueil"/></a>
                </body>
            </div>
        );
    }
};
