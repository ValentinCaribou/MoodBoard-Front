import React, {Component} from 'react';

//COMPONENTS
import AverageMood from "../averageMood/allMoods.jsx";
import PersonnalMood from '../averageMood/personnalMood.jsx';
import {connect} from "react-redux";
import  { withRouter } from 'react-router-dom'
import {userInscription, userUpdate} from "../../redux/user/dispatch";

//IMAGES
import options from "../../assets/options.png";

//CSS
import "./toolbar.scss";
import "./toolbar-bleu.scss";
import {getParameters} from "../../services/manageParameters";

class Toolbar extends Component{

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
            displayed:false,
            toolbarButton: 'toolbar-buttons',
            toolbarItemCard: 'toolbar-item-card',
            toolbarItemCardInteractive: 'toolbar-item-card-interactive',
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
        });
        this.changeStyle();
    }

    changeStyle = () => {
        const {user} = this.props;
        if(user.theme !== "" && user.theme !== "default"){
            this.setState({toolbarButton: 'toolbar-buttons-bleu'});
            this.setState({toolbarItemCard: 'toolbar-item-card-bleu'});
            this.setState({toolbarItemCardInteractive: 'toolbar-item-card-interactive-bleu'});
        } else {
            this.setState({toolbarButton: 'toolbar-buttons'});
            this.setState({toolbarItemCard: 'toolbar-item-card'});
            this.setState({toolbarItemCardInteractive: 'toolbar-item-card-interactive'});
        }
    };

    handleOnChange = (e) => {
        const target = e.currentTarget;
        let newUser = this.props.user;
        newUser.theme = target.value;
        this.props.dispatch(userUpdate(newUser, newUser._id));
        this.changeStyle();
        this.props.changeStyleParent(newUser);
    };

    displayOptions = () => {
        this.setState({displayed : !this.state.displayed})
    };

    goToAdminPanel = () => {
        this.props.history.push('/administrate');
    };

    deconnexion = () => {
        this.props.history.push('/');
    };

    render(){
        const {displayed, param} = this.state;
        const {user} = this.props;
        return (
            <div className="toolbar-container">
                <div className="toolbar-container-dropdown">
                    {
                        displayed
                        ? <img className="dropdownArrow" src={options} height="25" width="25" onClick={this.displayOptions} alt=""/>
                        : <img className="dropdownArrow" src={options} height="25" width="25" onClick={this.displayOptions} alt=""/>
                    }
                </div>
            {
                displayed &&
                <div className="toolbar-container-options">
                    <div className={this.state.toolbarItemCard}>
                        <div className="toolbar-item-card-user">Bonjour {user.surname + " " + user.name}</div>
                    </div>
                    <div className={this.state.toolbarItemCard}>
                        <div>Votre moyenne : <PersonnalMood/></div>
                    </div>
                    <div className={this.state.toolbarItemCard}>
                        <div> Moyenne globale : <AverageMood/></div>
                    </div>
                    <div className={this.state.toolbarItemCardInteractive}>
                        <div>Modifier le thème : </div>
                        <select name="theme" id="theme-select" onChange={this.handleOnChange}>
                            <option value="">--Sélectionner un thème--</option>
                            {
                                param.listThemes.map((theme, index) => {
                                    return <option key={index} value={theme}>{theme}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className={this.state.toolbarItemCardInteractive}>
                        <button className={this.state.toolbarButton} onClick={this.goToAdminPanel}>Paramètres</button>
                    </div>
                    <div className={this.state.toolbarItemCardInteractive}>
                        <button className={this.state.toolbarButton} onClick={this.deconnexion}>Déconnexion</button>
                    </div>
                </div>
            }
            </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};

export default withRouter(connect(mapStateToProps)(Toolbar));