import React from 'react';
import '../acceuilModal.scss';

class Inscription extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {user, handleOnChange, validateInscription} = this.props;
        return (
            <div>
                <div className="group">
                    <input type="text" id="email" className="inputText" required="required" onChange={handleOnChange} value={user.email}/>
                    <label htmlFor="email">Adresse mail : </label>
                    <div className="bar"></div>
                </div>
                <div className="group">
                    <input type="password" id="password" className="inputText" required="required" onChange={handleOnChange} value={user.password}/>
                    <label htmlFor="password">Mot de passe : </label>
                    <div className="bar"></div>
                </div>
                <div className="group">
                    <input type="password" id="confirmePassword" className="inputText" required="required" onChange={handleOnChange} value={user.confirmePassword}/>
                    <label htmlFor="confirmePassword">Confirmer le mot de passe : </label>
                    <div className="bar"></div>
                </div>
                <div className="group">
                    <input type="text" id="name" className="inputText" required="required" onChange={handleOnChange} value={user.name}/>
                    <label htmlFor="name">Nom : </label>
                    <div className="bar"></div>
                </div>
                <div className="group">
                    <input type="text" id="surname" className="inputText" required="required" onChange={handleOnChange} value={user.surname}/>
                    <label htmlFor="surname">Prenom : </label>
                    <div className="bar"></div>
                </div>
                <input type="submit" className="validate-button" value="Créer le compte" onClick={validateInscription}/>
            </div>
        )
    }
}

export default Inscription;