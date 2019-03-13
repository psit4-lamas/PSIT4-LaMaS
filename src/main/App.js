import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import AppNavigation from './routing/Router';
import './App.css';


// NB: this is the 2nd top most access point to the React frontend application
class App extends Component {

    render() {
        const { t } = this.props;

        return (
            <div>
                <div className="App-content">
                    <AppNavigation/>
                </div>

                <footer className="App-footer">
                    <p>{ t('footer.message') }</p>
                    <p>&copy;LaMaS2019</p>
                </footer>
            </div>
        );
    }
}

export default withNamespaces()(App);
