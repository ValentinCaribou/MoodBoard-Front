import React, {Component} from 'react';

export default class LoopCallComponents extends Component{

    callMultipleTime = (Component, callLoopTime) => {
        let componentRows = [];

        for(let row=0; row < callLoopTime; row++){
            componentRows.push(<td><Component/></td>);
        }
        return componentRows;
    }

}