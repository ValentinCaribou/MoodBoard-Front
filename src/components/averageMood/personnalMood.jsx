import React, {Component} from 'react';
import { get } from 'http';
import { getAll } from '../database/manageMood';

export default class PersonnalMood extends Component{

    constructor(props){
        super(props);
        this.state = {
            averageMood = ""
        }
    }

    render(){
        getAll().then();
    }
}