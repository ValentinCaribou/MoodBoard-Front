import React, {Component}  from 'react';
import '../../App.scss';
import '../../App-bleu.scss';
import Inscription from "../../components/acceuilModal/acceuilModal"
//import Soucoupe from "../../assets/app_launch_button3.png"
import logoSII from "../../assets/logo.svg"
import Fungenieur from "../../assets/logo_fungenieur.png"
import {connect} from "react-redux";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHide : true,
            AppHeader: 'App-header'
        }
    }

    componentDidMount() {
        const {user} = this.props;
        if(user.theme !== "" && user.theme !== "default"){
            this.setState({AppHeader: 'App-header-bleu'})
        }
    }

    changeHide = () => {
        this.setState({isHide: !this.state.isHide});
    };

    render() {
        let {isHide} = this.state;
        return (
            <div className="App">
                <header>
                </header>
                <div className="App-header">
                    <img src={Fungenieur} alt=""/>
                    {
                        !isHide &&
                        <Inscription
                            changeStatus={this.changeHide}
                        />
                    }
                    <input className="bouton-accueil image" onClick={this.changeHide} type="image" src={logoSII} aria-label=""/>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};

export default connect(mapStateToProps)(Home);
