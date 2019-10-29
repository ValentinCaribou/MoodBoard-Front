import React, {Component} from 'react';
import {connect} from "react-redux";
import { getAll } from '../database/manageMood';
import userReducer from "../../redux/user/reducers";

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

class PersonnalMood extends Component{

    constructor(props){
        super(props);
        this.state = {
            averageMood: "",
            listMoods: []
        }
    }

    async componentDidMount(){
        const {user}=this.props;
        let listeMoods = [];
        await getAll()
            .then(json => {
            json.map(mood => {
                if(user._id.includes(mood.idUser)){
                    listeMoods.push(mood.weekMood);
                }
            });
        });
        let myMood = this.calculateScore(listeMoods);
        this.setState({listMoods: listeMoods});
        if(myMood != undefined){
            this.setState({averageMood: myMood});
        }
    }

    calculateScore = (listMoods) => {
        var score = 0;
        listMoods.map(mood =>{
            Object.entries(mood).forEach(fragment => {
                if(fragment[1] !== undefined && fragment[1] !== ""){
                    score += compareMoods(fragment[1]);
                }
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
        let unicodeIdentifier = "0x";
        let emojiUnicode = unicodeIdentifier+entry.value.codePointAt(0).toString(16);
        let valueUnicode = "";
        if(valueToCompare !== undefined && valueToCompare !== ""){
            valueUnicode = unicodeIdentifier+valueToCompare.codePointAt(0).toString(16);
            if(emojiUnicode.includes(valueUnicode)){
                score = entry.score;
            }
        }
    })
    return score;
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};

export default connect(mapStateToProps)(PersonnalMood);