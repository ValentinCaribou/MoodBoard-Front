import React, {Component} from 'react';
import { getAll } from '../database/manageMood';

const listEmojis = [
    {name: "smile", value:"😄", score: 1},
    {name: "unamused", value: "😒", score: -1},
    {name: "dizzy_face", value: "😵", score: -1},
    {name: "cold_sweat", value: "😰", score: -1},
    {name: "angry", value: "😠", score: -1},
    {name: "sob", value: "😭", score: -1},
    {name: "normal", value: "😐", score: 1},
    {name: "upside-down", value: "🙃", score: 0}
];

export default class AverageMood extends Component{

    constructor(props){
        super(props);
        this.state = {
            averageMood: "",
            listMoods: []
        }
    }

    async componentDidMount(){
        let listeMoods = [];
        await getAll()
            .then(json => {
            json.map(mood => {  
                listeMoods.push(mood.weekMood);
            });
        });
        let mood = this.calculateScore(listeMoods);
        this.setState({listMoods: listeMoods});
        if(mood != undefined){
            this.setState({averageMood: mood});
        }
    }

    calculateScore = (listMoods) => {
        var score = 0;
        listMoods.map(mood =>{
            Object.entries(mood).forEach(fragment => {
                score += compareMoods(fragment[1]);
            })
        })
        this.calculateAverageMood(score);
    }
    
    calculateAverageMood = (score) => {
        let generalMood = "";
        if(score < 0){
            generalMood = "😠";
        }else if(score == 0){
            generalMood = "😐"
        }else{
            generalMood = "😄";
        }
        this.setState({averageMood: generalMood});
    }

    render(){
        return this.state.averageMood;
    }
}

function compareMoods(valueToCompare){
    let score = 0;
    listEmojis.map(entry =>{
        let emojiUnicode = "0x"+entry['value'].codePointAt(0).toString(16);
        let valueUnicode = "0x";
        if(valueToCompare == undefined){
            valueUnicode+=valueToCompare.codePointAt(0).toString(16);
        }
        if(emojiUnicode.includes(valueUnicode)){
            score = entry['score'];
        }
    })
    return score;
}