import React from 'react';
import '../acceuilModal.scss';

class Connexion extends React.Component {

    render() {
        const {user, handleOnChange, connexion} = this.props;
        return (
            <div>
                <div className="group">
                    <input type="text" id="email" className="inputText" required="required" onChange={handleOnChange} value={user.email}/>
                    <label htmlFor="email">Adresse mail : </label>
                    <div className="bar"></div>
                </div>
                <div className="group">
                    <input type="password" id="confirmePassword" className="inputText" required="required" onChange={handleOnChange} value={user.confirmePassword}/>
                    <label htmlFor="confirmePassword">Mot de passe : </label>
                    <div className="bar"></div>
                </div>
                <input type="submit" className="validate-button" value="Connexion" onClick={connexion}/>
            </div>
        )
    }
}

export default Connexion;