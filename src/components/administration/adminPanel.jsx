import React, {Component} from 'react';

import '../../App.scss'

export default class AdminEmail extends Component{

    constructor(props){
        super(props);
        this.state = {
            diffusionlist : [],
            isEdit : false
        }
    }

    allowEdit = () => {
        console.log("allowEdit function")
        this.setState({isEdit : !this.state.isEdit});
    }

    buttonDisplay = () => {
        console.log("buttonDisplay function : isEdit : "+this.state.isEdit);
        if(this.state.isEdit){
            return <button name="save" onClick={this.saveToDatabase()}>Sauvegarder</button>
        }else{
            return <button name="editer" onClick={this.allowEdit}>Editer</button>
        }
    }

    emailDisplay = () => {
        console.log("emailDisplay function : isEdit : "+this.state.isEdit)
        if(this.state.isEdit === false){
            return(
            <ul>{
                this.state.diffusionlist &&
                this.state.diffusionlist.map(item => {
                    return <li>{item}</li>
                })
            }
            </ul>);
        }else{
            return <textarea name="diffusion-list" cols="50" rows="10"/>;
        }
    }

    saveToDatabase = () => {
        this.allowEdit();
        console.log("jai bien clické et sauvegardé")
        return null;
    }

    render(){
        return(
            <div className="parameter-item">
                <h3>Gestion des emails</h3>
                <div>
                    <p>Liste de diffusion des emails</p>
                    {this.buttonDisplay()}
                    <div>
                        {this.emailDisplay()}
                    </div>
                </div>
            </div>
        );
    }
}

