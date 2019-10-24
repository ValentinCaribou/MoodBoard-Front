import React, {Component}  from 'react';
import '../../App.scss';
import Inscription from "../../components/acceuilModal/acceuilModal"
import Soucoupe from "../../assets/app_launch_button3.png"
import logoSII from "../../assets/logo.svg"
import Fungenieur from "../../assets/logo_fungenieur.png"

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHide : true,
        }
    }

    changeHide = () => {
        this.setState({isHide: !this.state.isHide});
    };

    handleOnChange = () => {

    };

    render() {
        let {isHide} = this.state;
        return (
            <div className="App">
                <header>
                </header>
                <div className="App-header">
                    <img src={Fungenieur}/>
                    {
                        !isHide &&
                        <Inscription
                            changeStatus={this.changeHide}
                        />
                    }
                    <input className="bouton-accueil image" onClick={this.changeHide} type="image" src={logoSII}/>
                </div>
            </div>
        );
    }
};
