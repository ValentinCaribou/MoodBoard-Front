import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import '../App.scss';
import './burger.scss';
import Toast from "../components/toast/index";
import Error404 from "../pages/error/error404"
import Home from "../pages/home/home"
import MoodBoard from "../pages/moodboard/moodboard";
import administrationPanel from '../pages/administration/administrationPanel';
import adminUser from '../pages/administration/administrationPanel';
import {slide as Menu} from "react-burger-menu";
import BurgerButton from '../components/burger-menu/burger-button'
import PersonnalMood from "../components/averageMood/personnalMood";
import AverageMood from "../components/averageMood/allMoods";
import {getParameters} from "../services/manageParameters";
import {userUpdate} from "../redux/user/dispatch";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {withStyles} from "@material-ui/core";
import EndMenu from "../components/itemMenu/listeItemEnd";
import StartMenu from "../components/itemMenu/listeItemStart";

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            param : {
                diffusionList : "",
                formatPreference : "",
                listEmojis : [{
                    code : "",
                    label : "",
                    score : 0
                }],
                listThemes : [],
            },
            isEmpty:false,
            theme: "my-menu"
        }
    }

    componentDidMount() {
        getParameters().then( json => {
            if (json[0] !== undefined){
                this.setState({param : json[0]});
                this.setState({isEmpty : false});
            } else {
                this.setState({isEmpty : true});
            }
            this.changeStyle();
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props){
            this.changeStyle();
        }
    }

    changeStyle = () => {
        const {user} = this.props;
        if(user.theme !== "" && user.theme !== "default"){
            this.setState({theme: 'my-menu-bleu'});
        } else {
            this.setState({theme: 'my-menu'});
        }
    };

    handleOnChange = (e) => {
        let newUser = this.props.user;
        newUser.theme = e.target.value;
        this.props.dispatch(userUpdate(newUser, newUser._id));
        this.changeStyle();
        // this.props.changeStyleParent(newUser);
    };

    render() {
        const {dispatch, toast, user} = this.props;
        const {param} = this.state;


        return (
            <div className='App'>
                {
                    toast &&
                    <Toast type={toast.type} message={toast.message} timeout={toast.timeout}
                           closeCallback={toast.closeCallback}
                           dispatch={dispatch}/>
                }

                <main>
                    <Router>
                        {
                            user.email !== "" &&
                            <Menu pageWrapId="page-wrap" width="auto"
                                  menuClassName={this.state.theme}
                                  outerContainerId="body" customBurgerIcon={<BurgerButton/>}
                                  burgerButtonClassName="burger-button"
                                  customCrossIcon={<i className="fas fa-times fa-times-cross"></i>} disableAutoFocus right>

                                <StartMenu
                                    user={user}
                                    param={param}
                                    onChange={this.handleOnChange}
                                />
                                <EndMenu/>
                            </Menu>
                        }
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
        user: state.userReducer.user,
    }
};

export default connect(mapStateToProps)(Main);
