import React, {Component}  from 'react';
import '../../App.scss';
import Week from "../../components/week.jsx";

export default class MoodBoard extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <h1>Moodboard</h1>
                </header>
                <div className="App-header">
                  <h1>Here is the component page.</h1>
                  <Week/>
                </div>
            </div>
        );
    }
};
