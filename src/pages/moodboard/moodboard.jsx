import React, {Component}  from 'react';
import {format, startOfWeek, endOfWeek} from 'date-fns';

//CSS
import '../../App.scss';
import './moodboard.scss'

//COMPONENTS
import Toolbar from "../../components/toolbar/toolbar.jsx";
import Week from '../../components/week.jsx';
import Fungenieur from '../../assets/logo_fungenieur.png';

//REDUX
import {sendMood, getAll, updateMood} from "../../services/manageMood";
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
      }
  }

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
            if(idMood === undefined){
                sendMood(jsonRequest)
                    .then(response => {
                        this.props.dispatch(balanceTonToast("success", "Ajout réussi"))
                        let idRow = response.message._id;
                        idUser.push(user._id);
                        idListe.push(idRow);
                        this.setState({idRow});
                        this.setState({idUser});
                    })
                    .catch(error => {
                        console.log("error : ", error);
                        this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoie"))
                    });
            } else {
                updateMood(jsonRequest, idMood)
                    .then(response => this.props.dispatch(balanceTonToast("success", "Ajout réussi")))
                    .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoie")));
            }
        } else {
            this.props.dispatch(balanceTonToast("error", "Vous ne pouvez pas modifier le mood des autres utilisateurs"));
        }

    };

    render() {
        let {isHide} = this.state;
        const {user} = this.props;
        return (
            <div className="App">
                <div className="App-header">
                <img src={Fungenieur} height="280px" width="650px"/>
                <Toolbar
                    user={user}
                />
                <h1 className="moodboard-week-title">Board de la semaine du {this.getStartofWeek()} au {this.getEndOfWeek()}</h1>
                  <Week
                    addMood={this.selectEmojis}
                    row={this.state.row}
                  />
                  {
                      !isHide &&
                      <div id="myModal" className="modal">
                          <div className="modal-content">
                              <div className="border">
                                  <div className="div-close">
                                      <span className="close" onClick={this.changeHide}>&times;</span>
                                  </div>
                                  <div>
                                      <div className="tooltip">
                                          <div className="emojis" id="smile" onClick={this.handleClick}><span role="img" aria-label="content / heureux">😄</span></div>
                                          <span className="tooltiptext">Content / Heureux</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="unamused" onClick={this.handleClick}><span role="img" aria-label="pas content">😒</span></div>
                                          <span className="tooltiptext">Pas Content</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="dizzy_face" onClick={this.handleClick}><span role="img" aria-label="sous l'eau">😵</span></div>
                                          <span className="tooltiptext">Sous l'eau</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="cold_sweat" onClick={this.handleClick}><span role="img" aria-label="stressé">😰</span></div>
                                          <span className="tooltiptext">Stresser</span>
                                      </div>
                                  </div>
                                  <div>
                                      <div className="tooltip">
                                          <div className="emojis" id="angry" onClick={this.handleClick}><span role="img" aria-label="en_colere">😠</span></div>
                                          <span className="tooltiptext">En colère</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="sob" onClick={this.handleClick}><span role="img" aria-label="triste">😭</span></div>
                                          <span className="tooltiptext">Triste</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="normal" onClick={this.handleClick}><span role="img" aria-label="normal">😐</span></div>
                                          <span className="tooltiptext">Normal</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="upside-down" onClick={this.handleClick}><span role="img" aria-label="blasé sarcastique">🙃</span></div>
                                          <span className="tooltiptext">Blasé sarcastique</span>
                                      </div>
                                  </div>
                                  <input type="submit" className="validate-button" value="Valider" onClick={this.validateButton}/>
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
