import React, {Component} from 'react';

//COMPONENTS
import AverageMood from "../averageMood/allMoods.jsx";
import PersonnalMood from '../averageMood/personnalMood.jsx';
import {connect} from "react-redux";
import  { withRouter } from 'react-router-dom'

//IMAGES
import options from "../../assets/options.png";

//CSS
import "./toolbar.scss";
import "./toolbar-bleu.scss";

class Toolbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            displayed:false,
            toolbarButton: 'toolbar-buttons',
            toolbarItemCard: 'toolbar-item-card',
            toolbarItemCardInteractive: 'toolbar-item-card-interactive',
        }
    }

    componentDidMount() {
        const {user} = this.props;
        if(user.theme !== "" && user.theme !== "default"){
            this.setState({toolbarButton: 'toolbar-buttons-bleu'});
            this.setState({toolbarItemCard: 'toolbar-item-card-bleu'});
            this.setState({toolbarItemCardInteractive: 'toolbar-item-card-interactive-bleu'});
        }
    }

    handleClickOutside(){
        this.setState({
          displayed: false
        })
    }

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
        const {displayed} = this.state;
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