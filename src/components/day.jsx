import React, {Component} from 'react';
import HalfDay from './half-day.jsx';

export default class Day extends Component{

    createColumnRowsHeaders = (isHeader) => {
        let componentRows = [];
        let daytime = ['Matin', 'Après-Midi'];

        for(let row=0; row < daytime.length; row++){
            if(isHeader == true){
                componentRows.push(<td name="part-time">{daytime[row]}</td>);
            }else{
                componentRows.push(<td><HalfDay/></td>);
            }
        }
        return componentRows;
    }

    render(){
        return (
                this.createColumnRowsHeaders(true)
        );
    }
}