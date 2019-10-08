import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.scss';
import Error404 from "../pages/error/error404"
import Home from "../pages/home/home"
import MoodBoard from "../pages/moodboard/moodboard";

export default class Main extends Component {
    render() {
        return (
            <div className="App">
                <main>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/moodboard" component={MoodBoard}/>
                            <Route component={Error404}/>
                        </Switch>
                    </Router>
                </main>
            </div>
        );
    }
}
