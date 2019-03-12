import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './main/reducers';
import { subscribeToAuthStateChanged } from './main/actions';
import * as serviceWorker from './serviceWorker';
import App from './main/App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(subscribeToAuthStateChanged());


// NB: this is the 1st top most access point to the React frontend application
const ReduxAwareApp = (
    <Provider store={ store }>
        <App/>
    </Provider>
);

ReactDOM.render(ReduxAwareApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
