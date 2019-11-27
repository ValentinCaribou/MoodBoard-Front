// import React from 'react';
// import '../acceuilModal.scss';
//
// class Inscription extends React.Component {
//
//     render() {
//         const {user, handleOnChange, validateInscription} = this.props;
//         return (
//             <div>
//                 <div className="group">
//                     <input type="text" id="email" className="inputText" required="required" onChange={handleOnChange} value={user.email}/>
//                     <label htmlFor="email">Adresse mail : </label>
//                     <div className="bar"></div>
//                 </div>
//                 <div className="group">
//                     <input type="password" id="password" className="inputText" required="required" onChange={handleOnChange} value={user.password}/>
//                     <label htmlFor="password">Mot de passe : </label>
//                     <div className="bar"></div>
//                 </div>
//                 <div className="group">
//                     <input type="password" id="confirmePassword" className="inputText" required="required" onChange={handleOnChange} value={user.confirmePassword}/>
//                     <label htmlFor="confirmePassword">Confirmer le mot de passe : </label>
//                     <div className="bar"></div>
//                 </div>
//                 <div className="group">
//                     <input type="text" id="name" className="inputText" required="required" onChange={handleOnChange} value={user.name}/>
//                     <label htmlFor="name">Nom : </label>
//                     <div className="bar"></div>
//                 </div>
//                 <div className="group">
//                     <input type="text" id="surname" className="inputText" required="required" onChange={handleOnChange} value={user.surname}/>
//                     <label htmlFor="surname">Prenom : </label>
//                     <div className="bar"></div>
//                 </div>
//                 <input type="submit" className="validate-button" value="Créer le compte" onClick={validateInscription}/>
//             </div>
//         )
//     }
// }
//
// export default Inscription;

import React from 'react';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import clsx from 'clsx';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { green, pink } from '@material-ui/core/colors';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#E91E63',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#E91E63',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#E91E63',
            },
        },
    },
})(TextField);

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    padding: {
        padding: 0,
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
        '&:hover': {
            backgroundColor: pink[700],
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
}))(Button);

export default function CustomizedInputs(props) {
    const classes = useStyles();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleClickShowConfirmedPassword = () => {
        setShowConfirmedPassword(!showConfirmedPassword);
    };

    const handleMouseDownConfirmedPassword = event => {
        event.preventDefault();
    };

    return (
        <div>
            <CssTextField className={classes.margin} style ={{width: '100%'}} id="email" onChange={props.handleOnChange} label="Adresse mail" />
            <FormControl className={clsx(classes.margin, classes.textField)} style ={{width: '100%'}}>
                <InputLabel htmlFor="standard-adornment-password" color="secondary">Mot de passe</InputLabel>
                <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={props.handleOnChange}
                    color="secondary"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownConfirmedPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl className={clsx(classes.margin, classes.textField)} style ={{width: '100%'}}>
                <InputLabel htmlFor="standard-adornment-password" color="secondary">Confirmer le mot de passe</InputLabel>
                <Input
                    id="confirmePassword"
                    type={showConfirmedPassword ? 'text' : 'password'}
                    onChange={props.handleOnChange}
                    color="secondary"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmedPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showConfirmedPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <CssTextField className={classes.margin} style ={{width: '100%'}} id="name" onChange={props.handleOnChange} label="Nom" />
            <CssTextField className={classes.margin} style ={{width: '100%'}} id="surname" onChange={props.handleOnChange} label="Prénom" />
            <ColorButton style ={{marginTop: '20px'}} variant="contained" color="primary" className={classes.button} onClick={props.validateInscription}>
                Valider
            </ColorButton>
        </div>
    );
}