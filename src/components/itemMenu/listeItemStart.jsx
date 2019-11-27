import React, {Component} from 'react';
import {connect} from "react-redux";
import  { withRouter } from 'react-router-dom'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {ThemeProvider} from "@material-ui/styles";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import StyleIcon from '@material-ui/icons/Style';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {createMuiTheme, withStyles} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import action from "../../redux/user/actions";
import {slide as Menu} from "react-burger-menu";
import PersonnalMood from "../averageMood/personnalMood";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import grey from '@material-ui/core/colors/grey'
import AverageMood from "../averageMood/allMoods";

class StartMenu extends Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    render(){
        const outerTheme = createMuiTheme({
            palette: {
                secondary: {
                    light: '#ffffff',
                    main: '#ffffff',
                    dark: '#ffffff',
                    contrastText: '#fff',
                },
                type: 'dark'
            },
        });

        const ColorForm = withStyles(theme => ({
            root: {
                width: '100%',
                color: '#ffffff',
            },
            margin: {
                margin: theme.spacing(1),
            },
        }))(FormControl);

        const ColorInput = withStyles(theme => ({
            root: {
                color: '#ffffff',
            }
        }))(InputLabel);

        const SelectInput = withStyles(theme => ({
            root: {
                width: '100%',
                color: '#ffffff',
            },
        }))(Select);

        const handleClose = () => {
            this.setState({isOpen: false});
        };

        const handleOpen = () => {
            this.setState({isOpen: true});
        };

        const {user, param} = this.props;
        const {isOpen} = this.state;
        return (
            <div style={{color: '#fff'}}>
                <div className="h1 bm-item-class">Menu</div>
                <label className="label bm-item-class">Projet Moodboard</label>

                <List component="nav" aria-label="main mailbox folders">
                    <ThemeProvider theme={outerTheme}>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonIcon color="secondary"/>
                            </ListItemIcon>
                            <ListItemText color="secondary" primary={user.surname + " " + user.name} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <EqualizerIcon color="secondary"/>
                            </ListItemIcon>
                            <ListItemText color="secondary" primary={"Votre Moyenne : "} /><PersonnalMood/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DonutLargeIcon color="secondary"/>
                            </ListItemIcon>
                            <ListItemText color="secondary" primary={"Votre Moyenne : "} /><AverageMood/>
                        </ListItem>
                        <ListItem button onClick={handleOpen}>
                            <ListItemIcon>
                                <StyleIcon color="secondary"/>
                            </ListItemIcon>
                            <ListItemText color="secondary" primary="Changer le thèmes" />
                        </ListItem>
                        <ColorForm>
                            <ThemeProvider theme={outerTheme}>
                                <ColorInput id="demo-controlled-open-select-label" color="secondary">Thème</ColorInput>
                                <SelectInput
                                    labelId="burger-menu-open-select-label"
                                    id="burger-menu-open-select"
                                    color="secondary"
                                    open={isOpen}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    onChange={this.props.onChange}
                                >
                                    <MenuItem disabled value="">
                                        <em>Sélectionner un thème</em>
                                    </MenuItem>
                                    {
                                        param.listThemes.map((theme, index) => {
                                            return <MenuItem value={theme}>{theme}</MenuItem>
                                        })
                                    }
                                </SelectInput>
                            </ThemeProvider>
                        </ColorForm>
                    </ThemeProvider>
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
};

export default withRouter(connect(mapStateToProps)(StartMenu));