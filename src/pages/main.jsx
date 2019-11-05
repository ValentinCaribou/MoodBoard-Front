import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
//import logo from '../logo.svg';
import '../App.scss';
import Toast from "../components/toast/index";
import Error404 from "../pages/error/error404"
import Home from "../pages/home/home"
import MoodBoard from "../pages/moodboard/moodboard";
import administrationPanel from '../pages/administration/administrationPanel';
import adminUser from '../pages/administration/administrationPanel';

class Main extends Component {
    render() {
        const {dispatch, toast} = this.props;
        return (
            <div className="App">
                {
                    toast &&
                    <Toast type={toast.type} message={toast.message} timeout={toast.timeout}
                           closeCallback={toast.closeCallback}
                           dispatch={dispatch}/>
                }
                <main>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/moodboard" component={MoodBoard}/>
                            <Route exact path="/administrate" component={administrationPanel}/>
                            <Route exact path="/adminUser" component={adminUser}/>
                            <Route component={Error404}/>
                        </Switch>
                    </Router>
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toast: state.toastReducer.toast,
    }
};

export default connect(mapStateToProps)(Main);
