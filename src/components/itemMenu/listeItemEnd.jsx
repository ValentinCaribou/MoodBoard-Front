import React, {Component} from 'react';
import {connect} from "react-redux";
import  { withRouter } from 'react-router-dom'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ThemeProvider} from "@material-ui/styles";
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {createMuiTheme} from "@material-ui/core";
import action from "../../redux/user/actions";
import Fungenieur from "../../assets/logo_fungenieur.png";

class EndMenu extends Component{

    goToAdminPanel = () => {
        this.props.history.push('/administrate');
    };

    deconnexion = () => {
        this.props.history.push('/');
        this.props.dispatch(action.setUser({email:'', password:"", confirmePassword:"", name:"", surname:""}));
    };

    render(){
        const outerTheme = createMuiTheme({
            palette: {
                secondary: {
                    light: '#ffffff',
                    main: '#ffffff',
                    dark: '#ffffff',
                    contrastText: '#fff',
                },
            },
        });

        return (
            <div className="param-block bm-item-fin">
                <img src={Fungenieur} className="logo-burger" alt=""/>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button onClick={this.goToAdminPanel}>
                        <ListItemIcon>
                            <ThemeProvider theme={outerTheme}>
                                <SettingsIcon color="secondary"/>
                            </ThemeProvider>
                        </ListItemIcon>
                        <ListItemText primary="Paramètres" />
                    </ListItem>
                    <ListItem button onClick={this.deconnexion}>
                        <ListItemIcon>
                            <ThemeProvider theme={outerTheme}>
                                <ExitToAppIcon color="secondary"/>
                            </ThemeProvider>
                        </ListItemIcon>
                        <ListItemText primary="Déconnexion" />
                    </ListItem>
                </List>
                <Divider />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};

export default withRouter(connect(mapStateToProps)(EndMenu));