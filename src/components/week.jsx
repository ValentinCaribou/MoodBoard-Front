import React, {Component} from 'react';
import Day from './day.jsx';

export default class Week extends Component{
    render(){
        return (
            <div>
                <h3>Week Component</h3>
                <Day/>
            </div>);
    }
}