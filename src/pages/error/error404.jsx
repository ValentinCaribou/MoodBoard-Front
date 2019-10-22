import React from 'react';
import './error404.css';

class Error404 extends React.Component {

    render() {
        return (

            <div>
                <div className="body-container">
                    <div className="white-container">
                        <h1 className="error-title">404</h1>
                        <span className="error-text">Vous êtes sûr d'être au bon endroit ?</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error404;