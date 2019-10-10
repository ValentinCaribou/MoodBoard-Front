import React, {Component}  from 'react';
import '../../App.scss';
import './moodboard.scss'
import Week from "../../components/week.jsx";

export default class MoodBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHide : true,
            tempValue: "",
            ValueEmojis: ""
        }
    }

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
            case "1":
                emojisFinal = "😄";
                break;
            case "2":
                emojisFinal = "😒";
                break;
            case "3":
                emojisFinal = "😵";
                break;
            case "4":
                emojisFinal = "😰";
                break;
            case "5":
                emojisFinal = "😠";
                break;
            case "6":
                emojisFinal = "😭";
                break;
            case "7":
                emojisFinal = "🙂";
                break;
            case "8":
                emojisFinal = "🙃";
                break;
        }
        return emojisFinal;
    };

    validateButton = () => {
        let idEmojis = this.state.tempValue;
        let emojisFinal = this.transformIdToEmojis(idEmojis);
        this.setState({ValueEmojis: emojisFinal})
    };

    render() {
        let {isHide, ValueEmojis} = this.state;
        return (
            <div className="App">
                <body className="App-header">
                  <h1>Here is the component page.</h1>
                  <Week/>
                  <button onClick={this.changeHide}>Test Modal</button>
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
                                          <div className="emojis" id="1" onClick={this.handleClick}>😄</div>
                                          <span className="tooltiptext">Content / Heureux</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="2" onClick={this.handleClick}>😒</div>
                                          <span className="tooltiptext">Pas Content</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="3" onClick={this.handleClick}>😵</div>
                                          <span className="tooltiptext">Sous l'eau</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="4" onClick={this.handleClick}>😰</div>
                                          <span className="tooltiptext">Stresser</span>
                                      </div>
                                  </div>
                                  <div>
                                      <div className="tooltip">
                                          <div className="emojis" id="5" onClick={this.handleClick}>😠</div>
                                          <span className="tooltiptext">En colère</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="6" onClick={this.handleClick}>😭</div>
                                          <span className="tooltiptext">Triste</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="7" onClick={this.handleClick}>🙂</div>
                                          <span className="tooltiptext">Normal</span>
                                      </div>
                                      <div className="tooltip">
                                          <div className="emojis" id="8" onClick={this.handleClick}>🙃</div>
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
                </body>
            </div>
        );
    }
};
