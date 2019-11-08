import React, {Component} from 'react';

//CSS
import "./week.scss";

import {connect} from 'react-redux';
import {deleteMood} from '../services/manageMood';
import {balanceTonToast} from "../redux/toast/dispatch";

class Week extends Component{

    constructor(props){
        super(props);
        this.state = {
            rowList : this.props.row,
            idRows : this.props.idListe,
            currentRows : 0
        };
    }

    componentDidMount() {
        this.setState({rowList: this.props.row});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props){
            if(this.props.row.length !== undefined){
                this.setState({rowList: this.props.row});
            }
        }
    }

    createRow = () => {
        let rowsCreated = this.state.currentRows;
        let newRowList =  {
            collabName: "",
            mondayNoonMood: "",
            mondayAfternoonMood: "",
            tuesdayNoonMood: "",
            tuesdayAfterNoonMood: "",
            wednesdayNoonMood: "",
            wednesdayAfterNoonMood: "",
            thursdayNoonMood: "",
            thursdayAfterNoonMood: "",
            fridayNoonMood: "",
            fridayAfterNoonMood: "",
        };
        let stateRowList = this.state.rowList;

        stateRowList.push(newRowList);
        rowsCreated+=1;

        //update props
        this.setState({rowList: stateRowList});
        this.setState({currentRows: rowsCreated});
    };

    // Méthode permettant de récupérer la valeur contenue dans le champ, la ligne ainsi que l'index de la ligne
    handleOnChange = (e, row, i) => {
        const target = e.currentTarget;
        row[target.name] = target.value;
        this.persistName(i);
    };

    deleteRow = (row, i) => {
        let rowList = this.state.rowList;
        let {idRows} = this.props;
        let rowId = idRows[i];

        if(rowId !== undefined){
            deleteMood(rowId)
            .then(response => this.props.dispatch(balanceTonToast("success", "Suppression effectuée")))
            .catch(error => this.props.dispatch(balanceTonToast("error", "Echec lors de la suppression")));

            {/** a supprimer */}
            rowList.splice(i,1);
            idRows.splice(i,1);

            this.setState({rowList});
            this.setState({idRows});
        }
    }

    // Méthode persiste name qui va permettre de faire persister la valeur contenue dans le champ avec un setState
    persistName = (indexRow) => {
        const rowList = this.state.rowList;
        let currentRow = rowList[indexRow];
        rowList.map((row, index) => {
            if(index === indexRow){
                row = currentRow;
            }
            return row;
        });

        this.setState({rowList});
    };

    renderRows = () => {
        let {addMood} = this.props;

        return this.state.rowList.map((row, i) => {
            let keyName = "row_"+i;
            //let rowList = this.state.rowList;
            return (
            <tr key={keyName} name={keyName}>
                <td><input type="text" onChange={(e) => this.handleOnChange(e, row, i)} name="collabName" value={row.collabName}/></td>
                {/** Lundi */}
                <td onClick={() => addMood("mondayNoonMood", row, keyName)}>{row.mondayNoonMood}</td>
                <td onClick={() => addMood("mondayAfternoonMood", row, keyName)}>{row.mondayAfternoonMood}</td>
                {/** Mardi */}
                <td onClick={() => addMood("tuesdayNoonMood", row, keyName)}>{row.tuesdayNoonMood}</td>
                <td onClick={() => addMood("tuesdayAfterNoonMood", row, keyName)}>{row.tuesdayAfterNoonMood}</td>
                {/** Mercredi */}
                <td onClick={() => addMood("wednesdayNoonMood", row, keyName)}>{row.wednesdayNoonMood}</td>
                <td onClick={() => addMood("wednesdayAfterNoonMood", row, keyName)}>{row.wednesdayAfterNoonMood}</td>
                {/** Jeudi */}
                <td onClick={() => addMood("thursdayNoonMood", row, keyName)}>{row.thursdayNoonMood}</td>
                <td onClick={() => addMood("thursdayAfterNoonMood", row, keyName)}>{row.thursdayAfterNoonMood}</td>
                {/** Vendredi */}
                <td onClick={() => addMood("fridayNoonMood", row, keyName)}>{row.fridayNoonMood}</td>
                <td onClick={() => addMood("fridayAfterNoonMood", row, keyName)}>{row.fridayAfterNoonMood}</td>
                {/** Bouton de suppression de la ligne courante */}
                <td><i className="fas fa-times-circle" onClick={() => this.deleteRow(row,i)}></i></td>
            </tr>
            )
        })
    };

    render(){
        return (
            <div name="moodboard_root" className="Moodboard">
                <div name="addRow">
                    <input type="submit" 
                            onClick={this.createRow} 
                            value="Ajouter"
                            className="AddRowButton"/>
                </div>
                <table className="Moodboard-table">
                    <tbody>
                        {/** Jours de la semaine */}
                        <tr name="dayHeader">
                            <th></th>
                            <th scope="col" colSpan="2">Lundi</th>
                            <th scope="col" colSpan="2">Mardi</th>
                            <th scope="col" colSpan="2">Mercredi</th>
                            <th scope="col" colSpan="2">Jeudi</th>
                            <th scope="col" colSpan="2">Vendredi</th>
                        </tr>
                        {/** Périodes de la journée */}
                        <tr name="daytimeHeader">
                            <td>Nom du collaborateur</td>
                            <td>Matin</td>
                            <td>Apres-midi</td>
                            <td>Matin</td>
                            <td>Apres-midi</td>
                            <td>Matin</td>
                            <td>Apres-midi</td>
                            <td>Matin</td>
                            <td>Apres-midi</td>
                            <td>Matin</td>
                            <td>Apres-midi</td>
                        </tr>
                        {
                            //si le props est vide, alors on ne l'affiche pas (notation avec les esperluettes)
                            this.state.rowList.length !== undefined &&
                            this.renderRows()
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect()(Week);