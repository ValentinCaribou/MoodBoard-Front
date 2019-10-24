import React, {Component}  from 'react';
import Main from './pages/main.jsx'
import './App.scss';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import toastReducer from "./redux/toast/reducers";
import userReducer from "./redux/user/reducers";
import '@fortawesome/fontawesome-free/css/all.min.css';

const reducer = combineReducers({
    toastReducer,
    userReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
};
