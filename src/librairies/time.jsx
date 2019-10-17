import React, {Component} from 'react';
import Moment from 'react-moment';

const date = new Date();

export default class Time extends Component{
    getStartofWeek = () => {
        //Les jours ouvrés sont compris entre 0 et 5 (Lundi à Vendredi) samedi et dimanche sont exclus
        let dayNumber = date.getDay();
        let dayDate = date.getDate();
        let month = date.getMonth()+1;
        let formattedDate = dayDate-dayNumber+"/"+month;
        return formattedDate;
    }

    getEndOfWeek = () => {
        let dayNumber = date.getDay();
        let dayDate = date.getDate();
        let month = date.getMonth()+1;
        let formattedDate = (5-dayNumber)+dayDate+"/"+month;
        return formattedDate;
    };

    getWeekNumber = () => {
        let weekNumber = Moment(date, "MMDDYYYY").isoWeek();
        return this.weekNumber;
    }
}