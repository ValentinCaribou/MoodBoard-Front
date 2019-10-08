import React, {Component} from 'react';
import Day from './day.jsx';

export default class Week extends Component{

    createWeekDayRows = () => {
        let weekdays = [];

        for(let row=0; row < 5; row++){
            weekdays.push(<td height="200px" width="200px"><Day/></td>);
        }
    }

    render(){
        return (
            <div>
                <table>
                    <tr onRender={() => {this.createWeekDayRows}}></tr>
                </table>
            </div>
        );
    }
}