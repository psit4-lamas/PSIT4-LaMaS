import React, { Component } from 'react';
import AppNavigation from './routing/Router';
import './App.css';


// NB: this is the 2nd top most access point to the React frontend application
class App extends Component {

    render() {

        return (
            <div>
                <div className="App-content">
                    <AppNavigation/>
                </div>

                <footer className="App-footer">
                    <p>Product from PSIT4 ZHAW course</p>
                    <p>&copy;LaMaS2019</p>
                </footer>
            </div>
        );
    }
}


export default App;
