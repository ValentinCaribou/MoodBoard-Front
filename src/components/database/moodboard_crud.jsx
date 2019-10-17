import React, {Component} from 'react';
import moods from './mocks/mock-database.json';
import time from '../../librairies/time.jsx';

export default class CRUDOperations extends Component{

    getCurrentWeekMoodBoard = () => {
        var currentWeek = "week"+time.getWeekNumber();
        var moodsOfWeek = moods.filter(mood => {
            if(mood.id.includes(currentWeek)){
                return mood;
            }
        });
        
    }

    saveMoodboard = (week, year, user, row) => {
        moods.map(mood => {
            if(mood.id == "week"+week+""+year+"_"+user.alias){
                mood.weeklyMood = row;
            }
        });
    }
}