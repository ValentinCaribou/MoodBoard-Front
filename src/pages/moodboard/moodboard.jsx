import React, {Component}  from 'react';
import Moment from 'react-moment';
import '../../App.scss';
import './moodboard.scss'
import Week from "../../components/week.jsx";
import Fungenieur from "../../assets/logo_fungenieur.png"

export default class MoodBoard extends Component {

  constructor(props) {
        super(props);
        this.state = {
            isHide : true,
            tempValue: "",
            ValueEmojis: "",
            row: [],
            keyName: "",
            cellule: "",
        }
    }

    getStartofWeek = () => {
        //Les jours ouvrés sont compris entre 0 et 5 (Lundi à Vendredi) samedi et dimanche sont exclus
        let date = new Date();
        let dayNumber = date.getDay();
        let dayDate = date.getDate();
        let month = date.getMonth()+1;
        let formattedDate = dayDate-dayNumber+"/"+month;
        return formattedDate;
    }

    getEndOfWeek = () => {
        let date = new Date();
        let dayNumber = date.getDay();
        let dayDate = date.getDate();
        let month = date.getMonth()+1;
        let formattedDate = (5-dayNumber)+dayDate+"/"+month;
        return formattedDate;
    };
    
    changeHide = () => {
        this.setState({isHide: !this.state.isHide});
        this.setState({tempValue: ""})
    };

    handleClick = (e) => {
        const target = e.currentTarget;
        console.log(target.id);
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
                emojisFinal = "🙂";
                break;
            case "upside-down":
                emojisFinal = "🙃";
                break;
        }
        return emojisFinal;
    };

    selectEmojis = (cellule, row) => {
        this.setState({isHide: !this.state.isHide});
        this.setState({cellule});
        this.setState({row});
    };

    validateButton = (id, keyName) => {
        let {cellule, row} = this.state;
        let idEmojis = this.state.tempValue;
        let emojisFinal = this.transformIdToEmojis(idEmojis);
        row[cellule] = emojisFinal;
        this.setState({keyName});
        this.setState({row});
        this.setState({idDay: id});
        this.setState({isHide: !this.state.isHide});
    };

    render() {
        let {isHide, ValueEmojis} = this.state;
        return (
            <div className="App">
                <div className="App-header">
                <img src={Fungenieur} height="280px" width="650px"/>
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
                                          <div className="emojis" id="normal" onClick={this.handleClick}>🙂</div>
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
                  {
                      ValueEmojis !== "" &&
                          <div>{ValueEmojis}</div>
                  }
                </div>
            </div>
        );
    }
};
