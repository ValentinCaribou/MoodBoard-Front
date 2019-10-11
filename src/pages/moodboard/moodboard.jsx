import React, {Component}  from 'react';
import Moment from 'react-moment';
import '../../App.scss';
import Week from "../../components/week.jsx";
import Fungenieur from "../../assets/logo_fungenieur.png"

export default class MoodBoard extends Component {

    getStartofWeek = () => {
        //Les jours ouvrés sont compris entre 0 et 5 (Lundi à Vendredi) samedi et dimanche sont exclus
        let date = new Date();
        let dayNumber = date.getDay();
        let dayDate = date.getDate();
        let month = date.getMonth()+1;
        let formattedDate = dayDate-dayNumber+"/"+month;
        return formattedDate;
    }

    getEndOfWeek = () => {
        let date = new Date();
        let dayNumber = date.getDay();
        let dayDate = date.getDate();
        let month = date.getMonth()+1;
        let formattedDate = (5-dayNumber)+dayDate+"/"+month;
        return formattedDate;
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                <img src={Fungenieur} height="280px" width="650px"/>
                <h1 className="moodboard-week-title">Board de la semaine du {this.getStartofWeek()} au {this.getEndOfWeek()}</h1>
                <Week/>
                </div>
            </div>
        );
    }
};
