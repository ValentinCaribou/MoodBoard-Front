import React, {Component} from 'react';
import Day from './day';

export default class Week extends Component{

    createColumnRows = (isHeader) => {
        let componentRows = [];
        let days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

        for(let row=0; row < days.length; row++){
            if(isHeader == true){
                componentRows.push(<td>{days[row]}</td>);
            }else{
                componentRows.push(<td><Day/></td>);
            }
        }
        return componentRows;
    }

    render(){
        
        return (
            <div name="moodboard_root">
                <table className="Moodboard-table">
                    <tbody>
                        <tr name="day">
                            {this.createColumnRows(true)}
                        </tr>
                        <tr name="daytime">
                            {this.createColumnRows(false)}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}