import React, {Component}  from 'react';

//CSS
import '../../App.scss';
import './moodboard.scss'

//COMPONENTS
import Toolbar from "../../components/toolbar/toolbar.jsx";
import Week from '../../components/week.jsx';
// import Time from '../../librairies/time.jsx';
import Fungenieur from '../../assets/logo_fungenieur.png';

//REDUX
import {sendMood, getAll, updateMood} from "../../components/database/manageMood";
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
        let dayNumber = date.getDay();
        let dayDate = date.getDate();
        let month = date.getMonth()+1;
        let formattedDate = (dayDate-dayNumber)+1+"/"+month;
        return formattedDate;
    };

  componentDidMount() {
      const {user} = this.props;
      if(user.email === ""){
          this.props.history.push("/");
      } else {
          let newListe = [];
          let idListe = [];
          let idUser = [];
          let listeMood = getAll().then(json => {
              json.map(mood => {
                  newListe.push(mood.weekMood);
                  idUser.push(mood.idUser);
                  idListe.push(mood._id);
              });
              this.setState({row: newListe});
              this.setState({idListe});
              this.setState({idUser});
          });
      }
  }

    getEndOfWeek = () => {
        let date = new Date();
        let dayNumber = date.getDay();
        let dayDate = date.getDate();
        let month = date.getMonth()+1;
        let formattedDate = ((5-dayNumber))+dayDate+"/"+month;
        return formattedDate;
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
                        let NewMood = response.message;
                        let idRow = response.message._id;
                        idUser.push(user._id);
                        idListe.push(idRow);
                        row.push(NewMood.weekMood);
                        this.setState({row});
                        this.setState({idRow});
                        this.setState({idUser});
                    })
                    .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de l'envoie")));
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
        let {isHide, ValueEmojis, row} = this.state;
        const {user} = this.props;
        return (
            <div className="App">
                <div className="App-header">
                <img src={Fungenieur} height="280px" width="650px"/>
                <Toolbar/>
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
                                          <div className="emojis" id="smile" onClick={this.handleClick}>😄</div>
                                          <span className="tooltiptext">Content / Heureux</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="unamused" onClick={this.handleClick}>😒</div>
                                          <span className="tooltiptext">Pas Content</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="dizzy_face" onClick={this.handleClick}>😵</div>
                                          <span className="tooltiptext">Sous l'eau</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="cold_sweat" onClick={this.handleClick}>😰</div>
                                          <span className="tooltiptext">Stresser</span>
                                      </div>
                                  </div>
                                  <div>
                                      <div className="tooltip">
                                          <div className="emojis" id="angry" onClick={this.handleClick}>😠</div>
                                          <span className="tooltiptext">En colère</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="sob" onClick={this.handleClick}>😭</div>
                                          <span className="tooltiptext">Triste</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="normal" onClick={this.handleClick}>😐</div>
                                          <span className="tooltiptext">Normal</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="upside-down" onClick={this.handleClick}>🙃</div>
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
