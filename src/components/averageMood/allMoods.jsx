import React, {Component} from 'react';
import { get } from 'http';
import { getAll } from '../database/manageMood';

const moods = [
    {name: "smile", value:"😄", score: 1},
    {name: "unamused", value: "😒", score: 1},
    {name: "dizzy_face", value: "😵", score: 0},
    {name: "cold_sweat", value: "😰", score: 0},
    {name: "angry", value: "😠", score: 0},
    {name: "sob", value: "😭", score: 0},
    {name: "normal", value: "🙂", score: 0},
    {name: "upside-down", value: "🙃", score: 0}
];

export default class AllMoods extends Component{

    scoreMoods = () => {
        const score = 0;
        getAll().then(json => {
            json.map(mood => {
                mood.map(period => {
                    moods.map( moodForScoring =>{
                        if(period == moodForScoring.value){
                            score += moodForScoring.score;
                        }
                    })
                })
            })
        });
        return score;
    }

    render(){
        return this.scoreMoods();
    }
}