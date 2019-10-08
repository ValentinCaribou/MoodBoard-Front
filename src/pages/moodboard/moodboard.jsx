import React, {Component}  from 'react';
import '../../App.scss';
import Week from "../../components/week.jsx";

export default class MoodBoard extends Component{
    render(){
        return (
            <div>
                <h1>Here is the component page.</h1>
                <Week/>
            </div>
        )
    }
}