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

class Toolbar extends Component{

    constructor(props){
        super(props);
        this.state = {
            displayed:false
        }
    }

    handleClickOutside(){
        this.setState({
          displayed: false
        })
      }

    displayOptions = () => {
        this.setState({displayed : !this.state.displayed})
    }

    goToAdminPanel = () => {
        console.log("passe ici gotoAdminPanel");
        this.props.history.push('/administrate');
    }

    deconnexion = () => {
        console.log("passe ici deconnexion");
        this.props.history.push('/');
    }

    render(){
        const {displayed} = this.state;
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
                    <div className="toolbar-item-card">
                        <div>Votre moyenne : <PersonnalMood/></div>
                    </div>
                    <div className="toolbar-item-card">
                        <div> Moyenne globale : <AverageMood/></div>
                    </div>
                    <div className="toolbar-item-card-interactive">
                        <button className="toolbar-buttons" onClick={this.goToAdminPanel}>Paramètres</button>
                    </div>
                    <div className="toolbar-item-card-interactive">
                        <button className="toolbar-buttons" onClick={this.deconnexion}>Déconnexion</button>
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