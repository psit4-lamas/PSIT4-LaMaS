import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Comment from './Comment/Comment';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [ 'item1', 'item2' ],
        }
    }

    onMessageAdd = (message) => {
        const messages = this.state.messages.slice();
        messages.push(message);

        this.setState({ messages });
    };

    render() {
        const { messages } = this.state;

        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={ logo } className='App-logo' alt='logo'/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className='App-link'
                        href='https://reactjs.org'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Learn React
                    </a>
                </header>

                <div style={ { padding: '25px 0', display: 'flex', flexDirection: 'row', justifyContent: 'center' } }>
                    <div>
                        <Comment saveMessage={ this.onMessageAdd }/>
                    </div>
                    <div>
                        <ul>
                            { messages.map((el) => <li key={ el }>{ el }</li>) }
                        </ul>
                    </div>
                </div>

                <footer className='App-footer'>
                    <p>Product from PSIT4 ZHAW course</p>
                    <p>&copy;LaMaS2019</p>
                </footer>
            </div>
        );
    }
}

export default App;
