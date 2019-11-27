// import React, {Component} from 'react';
// import './acceuilModal.scss'
import {connect} from "react-redux";
import {withRouter, useHistory } from 'react-router-dom'
import Connexion from "./connexion/connexion";
import {userLogin, userInscription} from "../../redux/user/dispatch";
import Inscription from "./inscription/inscription";
// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box'

// class AcceuilModal extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             user : {
//                 email:"",
//                 password:"",
//                 confirmePassword:"",
//                 name:"",
//                 surname:""
//             },
//             userFinal : {
//                 email:"",
//                 password:"",
//                 name:"",
//                 surname:""
//             },
//             userConnexion : {
//                 email: "",
//                 password: ""
//             },
//             setIsisError: false,
//             isErrorMessage: "",
//             connexion: true,
//             inscription: false,
//             isActive: true
//         }
//     }
//
//     handleOnChange = (e) => {
//         const target = e.currentTarget;
//         this.persistUser(target.id, target.value);
//     };
//
//     persistUser = (name, value) => {
//         const user = {...this.state.user};
//         user[name] = value;
//         this.setState({user});
//     };
//
//     validateEmail(email) {
//         const regexMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return regexMail.test(String(email).toLowerCase());
//     }
//
//     changeStatusConnexion = () => {
//         this.setState({connexion: true});
//         this.setState({inscription: false});
//         this.setState({isActive: true});
//     };
//
//     changeStatusInscription = () => {
//         this.setState({connexion: false});
//         this.setState({inscription: true});
//         this.setState({isActive: false});
//     };
//
//     validateInscription = () => {
//         const user = this.state.user;
//         let valide = this.validateEmail(user.email);
//         if (user.email.trim() !== ""
//             && user.password.trim() !== ""
//             && user.confirmePassword.trim() !== ""
//             && user.name.trim() !== ""
//             && user.surname.trim() !== ""){
//             if (valide){
//                 if(user.password !== user.confirmePassword){
//                     this.setState({isErrorMessage: "Les mots de passe doivent être identique"});
//                     this.setState({setIsisError: true});
//                 } else {
//                     let newUser = {
//                         email: user.email,
//                         password: user.password,
//                         role: "USER",
//                         name: user.name,
//                         surname: user.surname,
//                         theme:"default",
//                     };
//                     this.props.dispatch(userInscription(newUser));
//                     this.setState({setIsisError: false});
//                     this.props.changeStatus();
//                 }
//             } else {
//                 this.setState({isErrorMessage: "Adresse mail non valide"});
//                 this.setState({setIsisError: true});
//             }
//         } else {
//             this.setState({isErrorMessage: "Veuillez remplir tous les champs"});
//             this.setState({setIsisError: true});
//         }
//     };
//
//     connexion = () => {
//         let userConnexion = this.state.userConnexion;
//         userConnexion.email = this.state.user.email;
//         userConnexion.password = this.state.user.confirmePassword;
//         if (userConnexion.email.trim() !== "" && userConnexion.password.trim() !== ""){
//             let valide = this.validateEmail(userConnexion.email);
//             if(valide){
//                 this.setState({userConnexion});
//                 this.props.dispatch(userLogin(userConnexion, this.props));
//             } else {
//                 this.setState({isErrorMessage: "Adresse mail non valide"});
//                 this.setState({setIsisError: true});
//             }
//         }
//     };
//
//     render() {
//         const {user, setIsisError, isErrorMessage, connexion, inscription, isActive} = this.state;
//         return (
//             <div id="myModal" className="modal">
//                 <div className="modal-content">
//                     <div className="border">
//                         <div className="centered">
//                             <div className="div-close">
//                                 <span className="close" onClick={this.props.changeStatus}>&times;</span>
//                             </div>
//                             <div>
//                                 <input type="submit" className={isActive ? "connexion-button-active" : "connexion-button"} value="Connexion" onClick={this.changeStatusConnexion}/>
//                                 <input type="submit" className={isActive ? "connexion-button" : "connexion-button-active"} value="Inscription" onClick={this.changeStatusInscription}/>
//                             </div>
//                             {
//                                 setIsisError &&
//                                 <div className="group">
//                                     <label>{isErrorMessage}</label>
//                                 </div>
//                             }
//                             {
//                                 inscription &&
//                                 <Inscription
//                                     user={user}
//                                     handleOnChange={this.handleOnChange}
//                                     validateInscription={this.validateInscription}
//                                 />
//                             }
//                             {
//                                 connexion &&
//                                 <Connexion
//                                     user={user}
//                                     handleOnChange={this.handleOnChange}
//                                     connexion={this.connexion}
//                                 />
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         user: state.userReducer.user,
//     }
// };
//
// export default withRouter(connect(mapStateToProps)(AcceuilModal));

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from "react-redux";

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