import React, {Component} from 'react';

export default class Toolbar extends Component{

    render(){
        return (
            <div name="toolbar-container">
                <div name="toolbar-container-image">
                    <span name="toolbar-image">
                        <img src="../assets/options.svg"/>
                    </span>
                    <span name="toolbar-container-dropdown">
                        <img src="../assets/arrow_down.svg"/>
                    </span>
                </div>
                <div name="toolbar-container-options">
                    <div name="toolbar-item-card">
                        <span name="toolbar-item-image">
                            <img src="../assets/logout.svg"/>
                        </span>
                        <span name="tollbar-item-label">
                            Test
                        </span>
                    </div>
                </div>
            </div>
            );
    }
}