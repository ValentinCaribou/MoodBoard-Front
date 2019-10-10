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

    validateButton = () => {
        let idEmojis = this.state.tempValue;
        let emojisFinal = this.transformIdToEmojis(idEmojis);
        this.setState({ValueEmojis: emojisFinal});
        this.setState({isHide: !this.state.isHide});
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
                </body>
            </div>
        );
    }
};
