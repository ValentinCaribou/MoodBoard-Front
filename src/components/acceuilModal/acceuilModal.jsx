import {useHistory } from 'react-router-dom'
import Connexion from "./connexion/connexion";
import {userLogin, userInscription} from "../../redux/user/dispatch";
import Inscription from "./inscription/inscription";
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useDispatch } from "react-redux";

function TabPanel(props) {
    const {children, value, index, user, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={2}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FullWidthTabs(props) {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useHistory();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props);
    const [value, setValue] = useState(0);
    const [isError, setIsError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState({email:'', password:"", confirmePassword:"", name:"", surname:""});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const handleOnChange = (e) => {
        const target = e.currentTarget;
        persistUser(target.id, target.value);
    };

    const persistUser = (name, value) => {
        const newUser = {...user};
        newUser[name] = value;
        setUser(newUser);
    };

    const validateEmail = (email) => {
        const regexMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexMail.test(String(email).toLowerCase());
    };

    const connexion = () => {
        let newUserConnexion = {email: "", password: ""};
        newUserConnexion.email = user.email;
        newUserConnexion.password = user.password;
        if (newUserConnexion.email.trim() !== "" && newUserConnexion.password.trim() !== ""){
            let valide = validateEmail(newUserConnexion.email);
            if(valide){
                dispatch(userLogin(newUserConnexion, history));
            } else {
                setErrorMessage( "Adresse mail non valide");
                setIsError( true);
            }
        }
    };

    function useOutsideAlerter(ref, props) {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                props.changeStatus();
            }
        }

        useEffect(() => {
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        });
    }

    const validateInscription = () => {
        const currentUser = user;
        let valide = validateEmail(currentUser.email);
        if (currentUser.email.trim() !== ""
            && currentUser.password.trim() !== ""
            && currentUser.confirmePassword.trim() !== ""
            && currentUser.name.trim() !== ""
            && currentUser.surname.trim() !== ""){
            if (valide){
                if(currentUser.password !== currentUser.confirmePassword){
                    setErrorMessage( "Les mots de passe doivent être identique");
                    setIsError( true);
                } else {
                    let newUser = {
                        email: currentUser.email,
                        password: currentUser.password,
                        role: "USER",
                        name: currentUser.name,
                        surname: currentUser.surname,
                        theme:"default",
                    };
                    dispatch(userInscription(newUser));
                    setIsError(false);
                    props.changeStatus();
                }
            } else {
                setErrorMessage( "Adresse mail non valide");
                setIsError(true);
            }
        } else {
            setErrorMessage( "Veuillez remplir tous les champs");
            setIsError(true);
        }
    };

    return (
        <div id="myModal" className="modal">
            <div className="modal-content" ref={wrapperRef}>
                <div className="border">
                    <div className="centered">
                        {/*<div className="div-close">*/}
                        {/*    <span className="close" onClick={props.changeStatus}>&times;</span>*/}
                        {/*</div>*/}
                        {
                                isError &&
                                <div className="group">
                                    <label>{ErrorMessage}</label>
                                </div>
                            }
                            <div className={classes.root}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="secondary"
                                        textColor="secondary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Connexion" {...a11yProps(0)} />
                                        <Tab label="Inscription" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <Connexion
                                            user={user}
                                            handleOnChange={handleOnChange}
                                            connexion={connexion}
                                        />
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Inscription
                                             user={user}
                                             handleOnChange={handleOnChange}
                                             validateInscription={validateInscription}
                                         />
                                    </TabPanel>
                                </SwipeableViews>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}