import React, {Component} from 'react';

//COMPONENTS
import Admin from '../../components/administration/adminPanel';

//CSS
import '../../App.scss';
import './administrationPanel.scss';

export default class AdminPanel extends Component{

    render(){
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Administration des paramètres</h1>
                    <a href="./moodboard">Return</a>
                    <Admin/>
                </div>
            </div>
        );
    }
}