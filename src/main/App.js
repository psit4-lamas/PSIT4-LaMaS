import React, { Component } from 'react';
import i18n from '../i18n';
import { withNamespaces } from 'react-i18next';
import AppNavigation from './routing/Router';
import './App.css';


// NB: this is the 2nd top most access point to the React frontend application
class App extends Component {

    changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    render() {
        const { t } = this.props;

        return (
            <div>
                <div className="App-content">
                    <div>
                        <button onClick={ () => this.changeLanguage('de') }>de</button>
                        <button onClick={ () => this.changeLanguage('en') }>en</button>
                    </div>
                    <AppNavigation/>
                </div>

                <footer className="App-footer">
                    <p>{ t('welcome.message') } Product from PSIT4 ZHAW course</p>
                    <p>&copy;LaMaS2019</p>
                </footer>
            </div>
        );
    }
}

export default withNamespaces()(App);
