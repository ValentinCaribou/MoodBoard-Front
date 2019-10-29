import React, {Component} from 'react';
import  { Redirect } from 'react-router-dom'

//COMPONENTS
import AverageMood from "../averageMood/allMoods.jsx";
import PersonnalMood from '../averageMood/personnalMood.jsx';
import {connect} from "react-redux";
import userReducer from "../../redux/user/reducers";

//IMAGES
import options from "../../assets/options.png";
//import arrow_down from "../../assets/arrow_down.png";
//import arrow_up from "../../assets/arrow_up.png";
//import params from "../../assets/parameters.png";
//import logout from "../../assets/logout.png";

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

    displayOptions = () =>{
        this.setState({displayed : !this.state.displayed})
    };

    render(){
        const {displayed} = this.state;
        const {user} = this.props;
        return (
            <div className="toolbar-container">
                <div className="toolbar-container-dropdown">
                    {
                        displayed
                        ? <img className="dropdownArrow" src={options} height="25" width="25" onClick={this.displayOptions}/>
                        : <img className="dropdownArrow" src={options} height="25" width="25" onClick={this.displayOptions}/>
                    }
                </div>
            {
                displayed &&
                <div className="toolbar-container-options">
                    <div className="toolbar-item-card">
                        <div className="toolbar-item-card-user">Bonjour {user.surname + " " + user.name}</div>
                    </div>
                    <div className="toolbar-item-card">
                        <div>Votre moyenne : <PersonnalMood/></div>
                    </div>
                    <div className="toolbar-item-card">
                        <div> Moyenne globale : <AverageMood/></div>
                    </div>
                    {/** 
                    RAJOUTER UNE CONDITIONNELLE SUR LE ROLE DE L'UTILISATEUR CONECTE : 
                    SI ADMIN ALORS VISIBLE, 
                    SINON PAS VISIBLE 
                    */}
                    <div className="toolbar-item-card">
                        <div>Paramètres</div>
                    </div>
                    <div className="toolbar-item-card">
                        <div><input type="submit" label="Déconnexion"/></div>
                        {/**onClick={this.deconnexion()*/}
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

export default connect(mapStateToProps)(Toolbar);