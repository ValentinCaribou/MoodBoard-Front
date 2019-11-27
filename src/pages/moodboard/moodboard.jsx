import React, {Component}  from 'react';
import {format, startOfWeek, endOfWeek} from 'date-fns';
import { slide as Menu } from 'react-burger-menu'

//CSS
import '../../App.scss';
import '../../App-bleu.scss';
import './moodboard.scss'
import './moodboard-bleu.scss'

//COMPONENTS
import Toolbar from "../../components/toolbar/toolbar.jsx";
import Week from '../../components/week.jsx';
import Fungenieur from '../../assets/logo_fungenieur.png';

//REDUX
import {sendMood, getAll, updateMood, deleteMood} from "../../services/manageMood";
import {balanceTonToast} from "../../redux/toast/dispatch";
import {connect} from 'react-redux';
import  { withRouter } from 'react-router-dom'
import action from "../../redux/user/actions";

class MoodBoard extends Component {

  constructor(props) {
        super(props);
        this.state = {
            isHide : true,
            tempValue: "",
            ValueEmojis: "",
            row: [],
            idListe: [],
            idUser: [],
            keyName: "",
            cellule: "",
            AppHeader: 'App-header',
            border: 'border',
            tooltiptext: 'tooltiptext',
            tooltip: 'tooltip',
            button: 'validate-button',
            div: 'div-close',
            addButton: 'AddRowButton',
        }
    }

    getStartofWeek = () => {
        //Les jours ouvrés sont compris entre 0 et 4 (Lundi à Vendredi) samedi et dimanche sont exclus
        let date = new Date();
        let start = startOfWeek(date, { weekStartsOn: 1 });
        return format(start, "dd/MM");
    };

  componentDidMount() {
      const {user} = this.props;
      if(user.email === ""){
          this.props.history.push("/");
      } else {
          this.changeStyle(user);
          this.getMood();
      }
  }

  getMood = () => {
      let newListe = [];
      let idListe = [];
      let idUser = [];
      getAll().then(json => {
          json.map(mood => {
              newListe.push(mood.weekMood);
              idUser.push(mood.idUser);
              idListe.push(mood._id);
              return null;
          });
          this.setState({row: newListe});
          this.setState({idListe});
          this.setState({idUser});
      });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
      if(prevProps !== this.props){
          this.changeStyle(this.props.user);
      }
  }

    changeStyle = (user) => {
      if(user.theme !== "" && user.theme !== "default"){
          this.setState({AppHeader: 'App-header-bleu'});
          this.setState({border: 'border-bleu'});
          this.setState({tooltip: 'tooltip-bleu'});
          this.setState({tooltiptext: 'tooltiptext-bleu'});
          this.setState({button: 'validate-button-bleu'});
          this.setState({div: 'div-close-bleu'});
          this.setState({addButton: 'AddRowButton-bleu'});
      } else {
          this.setState({AppHeader: 'App-header'});
          this.setState({border: 'border'});
          this.setState({tooltip: 'tooltip'});
          this.setState({tooltiptext: 'tooltiptext'});
          this.setState({button: 'validate-button'});
          this.setState({div: 'div-close'});
          this.setState({addButton: 'AddRowButton'});
      }
  };


    getEndOfWeek = () => {
        let date = new Date();
        let end = endOfWeek(date, { weekStartsOn: 6 });
        return format(end, "dd/MM");
    };
    
    changeHide = () => {
        this.setState({isHide: !this.state.isHide});
        this.setState({tempValue: ""})
    };

    handleClick = (e) => {
        const target = e.currentTarget;
        this.setState({tempValue: target.id});
    };

    transformIdToEmojis = (id) => {
        let emojisFinal;
        switch (id) {
            case "smile":
                emojisFinal = "😄";
                break;
            case "unamused":
                emojisFinal = "😒";
                break;
            case "dizzy_face":
                emojisFinal = "😵";
                break;
            case "cold_sweat":
                emojisFinal = "😰";
                break;
            case "angry":
                emojisFinal = "😠";
                break;
            case "sob":
                emojisFinal = "😭";
                break;
            case "normal":
                emojisFinal = "😐";
                break;
            case "upside-down":
                emojisFinal = "🙃";
                break;
            default:
                break;
        }
        return emojisFinal;
    };

    selectEmojis = (cellule, row, keyName) => {
        this.setState({isHide: !this.state.isHide});
        this.setState({cellule});
        this.setState({row});
        this.setState({keyName});
    };

    sendUpdateMood = (idMood, jsonRequest) => {
        if(idMood === undefined){
            sendMood(jsonRequest)
                .then(response => {
                    this.props.dispatch(balanceTonToast("success", "Ajout réussi"))
                    this.getMood();
                })
                .catch(error => {
                    this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoie"))
                });
        } else {
            updateMood(jsonRequest, idMood)
                .then(response => {
                    this.props.dispatch(balanceTonToast("success", "Ajout réussi"))
                    this.getMood();
                })
                .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoie")));
        }
    };

    validateButton = (id) => {
        let {cellule, row, keyName, idUser, idListe} = this.state;
        const {user} = this.props;
        let indexTab = keyName.split("_");
        let idMood = idListe[indexTab[1]];
        let idUserMood = idUser[indexTab[1]];
        if (idUserMood === user._id || idUserMood === undefined){
            let idEmojis = this.state.tempValue;
            let emojisFinal = this.transformIdToEmojis(idEmojis);
            row[cellule] = emojisFinal;
            this.setState({row});
            this.setState({idDay: id});
            this.setState({isHide: !this.state.isHide});
            let jsonRequest = {
                idUser: user._id,
                weekMood:row
            };
            this.sendUpdateMood(idMood, jsonRequest);
        } else {
            this.props.dispatch(balanceTonToast("error", "Vous ne pouvez pas modifier le mood des autres utilisateurs"));
        }
    };

    deleteRow = (row, i, keyName) => {
        let {idUser, idListe} = this.state;
        const {user} = this.props;
        let rowId = idListe[i];
        let indexTab = keyName.split("_");
        let idUserMood = idUser[indexTab[1]];

        if(rowId !== undefined){
            console.log("ID parent : ", idUserMood);
            if (idUserMood === user._id || idUserMood === undefined){
                deleteMood(rowId)
                    .then(response => {
                        this.props.dispatch(balanceTonToast("success", "Suppression effectuée"))
                        this.getMood();
                    })
                    .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de la suppression")));
            } else {
                this.props.dispatch(balanceTonToast("error", "Vous ne pouvez pas supprimer le mood des autres utilisateurs"));
            }
        }
    };

    render() {
        let {isHide, AppHeader, keyName, idUser} = this.state;
        const {user} = this.props;
        let indexTab = keyName.split("_");
        let idUserMood = idUser[indexTab[1]];
        return (
            <div className="App">
                <div className={AppHeader}>
                <img className="logo" src={Fungenieur}/>
                {/*<h1 className="moodboard-week-title">Board de la semaine du {this.getStartofWeek()} au {this.getEndOfWeek()}</h1>*/}
                <h1 className="moodboard-week-title">Board de la semaine</h1>
                  <Week
                      debutSemaine={this.getStartofWeek()}
                      finSemaine={this.getEndOfWeek()}
                      addMood={this.selectEmojis}
                      deleteMood={this.deleteRow}
                      row={this.state.row}
                      user={user}
                      updateMood={this.getMood}
                      idRows={this.state.idListe}
                      themeBouton={this.state.addButton}
                  />
                  {
                      !isHide &&
                      <div id="myModal" className="modal">
                          <div className="modal-content">
                              <div className={this.state.border}>
                                  <div className={this.state.div}>
                                      <span className="close" onClick={this.changeHide}>&times;</span>
                                  </div>
                                  <div>
                                      <div className={this.state.tooltip}>
                                          <div className="emojis" id="smile" onClick={this.handleClick}><span role="img" aria-label="content / heureux">😄</span></div>
                                          <span className={this.state.tooltiptext}>Content / Heureux</span>
                                      </div>
                                      <div className={this.state.tooltip}>
                                          <div className="emojis" id="unamused" onClick={this.handleClick}><span role="img" aria-label="pas content">😒</span></div>
                                          <span className={this.state.tooltiptext}>Pas Content</span>
                                      </div>
                                      <div className={this.state.tooltip}>
                                          <div className="emojis" id="dizzy_face" onClick={this.handleClick}><span role="img" aria-label="sous l'eau">😵</span></div>
                                          <span className={this.state.tooltiptext}>Sous l'eau</span>
                                      </div>
                                      <div className={this.state.tooltip}>
                                          <div className="emojis" id="cold_sweat" onClick={this.handleClick}><span role="img" aria-label="stressé">😰</span></div>
                                          <span className={this.state.tooltiptext}>Stresser</span>
                                      </div>
                                  </div>
                                  <div>
                                      <div className={this.state.tooltip}>
                                          <div className="emojis" id="angry" onClick={this.handleClick}><span role="img" aria-label="en_colere">😠</span></div>
                                          <span className={this.state.tooltiptext}>En colère</span>
                                      </div>
                                      <div className={this.state.tooltip}>
                                          <div className="emojis" id="sob" onClick={this.handleClick}><span role="img" aria-label="triste">😭</span></div>
                                          <span className={this.state.tooltiptext}>Triste</span>
                                      </div>
                                      <div className={this.state.tooltip}>
                                          <div className="emojis" id="normal" onClick={this.handleClick}><span role="img" aria-label="normal">😐</span></div>
                                          <span className={this.state.tooltiptext}>Normal</span>
                                      </div>
                                      <div className={this.state.tooltip}>
                                          <div className="emojis" id="upside-down" onClick={this.handleClick}><span role="img" aria-label="blasé sarcastique">🙃</span></div>
                                          <span className={this.state.tooltiptext}>Blasé sarcastique</span>
                                      </div>
                                  </div>
                                  <input type="submit" className={this.state.button} value="Valider" onClick={this.validateButton}/>
                              </div>
                          </div>
                      </div>
                  }
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

export default withRouter(connect(mapStateToProps)(MoodBoard));
