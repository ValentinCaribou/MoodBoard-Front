import React, {Component} from 'react';

export default class Week extends Component{

    constructor(props){
        super(props);
        this.state = {
            rowList : [{
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
                }],
            currentRows : 0
        };
    }

    createRow = () => {
        let {addMood, emojis} = this.props;
        let rowsCreated = this.state.currentRows;
        let keyName = 'row_'+rowsCreated;
        let stateRowList = this.state.rowList;
        let row = <tr key={keyName} name={keyName}>
                    {/** nom du collab */}
                    <td></td>
                    {/** Jours */}
                    {/** Lundi */}
                    <td></td>
                    <td></td>
                    {/** Mardi */}
                    <td></td>
                    <td></td>
                    {/** Mercredi */}
                    <td></td>
                    <td></td>
                    {/** Jeudi */}
                    <td></td>
                    <td></td>
                    {/** Vendredi */}
                    <td></td>
                    <td></td>
                </tr>
        
        stateRowList.push(row);
        rowsCreated+=1;

        //update props
        this.setState({rowList: stateRowList});
        this.setState({currentRows: rowsCreated});
    };

    transformToEmojis = () => {

    };

    renderRows = () => {
        let {addMood} = this.props;
        return this.state.rowList.map((row, i) => {
            let keyName = "row_"+i;
            return (
            <tr key={keyName} name={keyName}>
                <td><input type="text" value={row.collabName}/></td>
                {/** Lundi */}
                <td onClick={() => addMood("mondayNoonMood", row)}>{row.mondayNoonMood}</td>
                <td onClick={() => addMood("mondayAfternoonMood", row)}>{row.mondayAfternoonMood}</td>
                {/** Mardi */}
                <td onClick={() => addMood("tuesdayNoonMood", row)}>{row.tuesdayNoonMood}</td>
                <td onClick={() => addMood("tuesdayAfterNoonMood", row)}>{row.tuesdayAfterNoonMood}</td>
                {/** Mercredi */}
                <td onClick={() => addMood("wednesdayNoonMood", row)}>{row.wednesdayNoonMood}</td>
                <td onClick={() => addMood("wednesdayAfterNoonMood", row)}>{row.wednesdayAfterNoonMood}</td>
                {/** Jeudi */}
                <td onClick={() => addMood("thursdayNoonMood", row)}>{row.thursdayNoonMood}</td>
                <td onClick={() => addMood("thursdayAfterNoonMood", row)}>{row.thursdayAfterNoonMood}</td>
                {/** Vendredi */}
                <td onClick={() => addMood("fridayNoonMood", row)}>{row.fridayNoonMood}</td>
                <td onClick={() => addMood("fridayAfterNoonMood", row)}>{row.fridayAfterNoonMood}</td>
            </tr>
            )
        })
    };

    render(){
        return (
            <div name="moodboard_root">
                <div name="addRow">
                    <input type="submit" name="add" onClick={this.createRow} value="Ajouter une ligne"/>
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
                            this.state.rowList.length !== 0 &&
                            this.renderRows()
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}