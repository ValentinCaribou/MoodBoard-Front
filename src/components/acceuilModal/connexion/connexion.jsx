// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import '../acceuilModal.scss';
//
// class Connexion extends React.Component {
//
//     render() {
//         const {user, handleOnChange, connexion} = this.props;
//         return (
//             <div>
//                 <CssTextField className={classes.margin} id="custom-css-standard-input" label="Custom CSS" />
//                 <div className="group">
//                     <input type="text" id="email" className="inputText" required="required" onChange={handleOnChange} value={user.email}/>
//                     <label htmlFor="email">Adresse mail : </label>
//                     <div className="bar"></div>
//                 </div>
//                 <div className="group">
//                     <input type="password" id="password" className="inputText" required="required" onChange={handleOnChange} value={user.password}/>
//                     <label htmlFor="confirmePassword">Mot de passe : </label>
//                     <div className="bar"></div>
//                 </div>
//                 <input type="submit" className="validate-button" value="Connexion" onClick={connexion}/>
//             </div>
//         );
//     }
// }
//
// export default Connexion;

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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
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
                    value={props.user.password}
                    onChange={props.handleOnChange}
                    color="secondary"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <ColorButton style ={{marginTop: '20px'}} variant="contained" color="primary" className={classes.button} onClick={props.connexion}>
                Connexion
            </ColorButton>
        </div>
    );
}