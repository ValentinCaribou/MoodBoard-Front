import React, {Component}  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
//import logo from '../logo.svg';
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
import selectInput from "../components/select/selectInput"
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
        console.log(user);
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
                {
                    user.email !== "" &&
                    <Menu pageWrapId="page-wrap" width="auto"
                          menuClassName={this.state.theme}
                          outerContainerId="body" customBurgerIcon={<BurgerButton/>}
                          burgerButtonClassName="burger-button"
                          customCrossIcon={<i className="fas fa-times fa-times-cross"></i>} disableAutoFocus right>


                        <div className="h1">Menu</div>
                        <label className="label">Projet Moodboard</label>

                        <a id="userName" className="bm-item menu-item"><i className="fas fa-user"/>{user.surname + " " + user.name}</a>

                        <a id="userAverage" className="bm-item menu-item"><i className="fas fa-chart-line"></i>Votre Moyenne : <PersonnalMood/></a>

                        <a id="globalAverage" className="bm-item menu-item"><i className="fas fa-chart-pie"></i>Moyenne général : <AverageMood/></a>

                        <a id="changeStyle" className="bm-item menu-item"><i className="fas fa-paint-roller"></i>Changer le thèmes : </a>

                        <a id="changeStyleSelect" className="bm-item menu-item">
                            <FormControl style ={{width: '100%'}}>
                                <InputLabel id="demo-controlled-open-select-label">Thème</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    // value={age}
                                    style ={{width: '100%'}}
                                    onChange={this.handleOnChange}
                                >
                                    <MenuItem value="">
                                        <em>Sélectionner un thème</em>
                                    </MenuItem>
                                    {
                                        param.listThemes.map((theme, index) => {
                                            return <MenuItem value={theme}>{theme}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </a>
                        {/*<select name="theme" id="theme-select" onChange={this.handleOnChange}>*/}
                        {/*    <option value="">--Sélectionner un thème--</option>*/}
                        {/*    {*/}
                        {/*        param.listThemes.map((theme, index) => {*/}
                        {/*            return <option key={index} value={theme}>{theme}</option>*/}
                        {/*        })*/}
                        {/*    }*/}
                        {/*</select>*/}
                    </Menu>
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
        user: state.userReducer.user,
    }
};

export default connect(mapStateToProps)(Main);
