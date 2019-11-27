import React, {Component}  from 'react';
import '../../App.scss';
import '../../App-bleu.scss';
import Inscription from "../../components/acceuilModal/acceuilModal"
import Soucoupe from "../../assets/app_launch_button3.png"
import nuage from "../../assets/nuages.png"
// import logoSII from "../../assets/logo.svg"
import Fungenieur from "../../assets/logo_fungenieur.png"
import Earth from "../../assets/kisspng-earth-drawing-cut.png"
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
                    {/*<div className="title">*/}
                    {/*    <span className="oval">#MOOD</span>*/}
                    {/*    <span>GENIEUR</span>*/}
                    {/*</div>*/}
                    <span className="texte-acceuil">C'est ici que vous pouvez ajouter votre humeur</span>
                    {
                        !isHide &&
                        <Inscription
                            changeStatus={this.changeHide}
                            user={this.props.user}
                        />
                    }
                    {/*<span className="trainer-1 fadeInDown"/>*/}
                    {/*<span className="trainer-2 fadeInDown"/>*/}
                    {/*<span className="trainer-3 fadeInDown"/>*/}
                    <div className="ombre-div fadeInDownDiv"/>
                    <input className="bouton-accueil fadeInOut" type="image" src={nuage} aria-label=""/>
                    <input className="bouton-accueil image fadeInDown" onClick={this.changeHide} type="image" src={Soucoupe} aria-label=""/>
                    <figure className="change-ratio">
                        <img src={Earth} className="earth" alt=""/>
                    </figure>
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
