import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from './actions';
import { withNamespaces } from 'react-i18next';
import BaseLayout from './pages/BaseLayout';
import AppNavigation from './routing/AppNavigation';
import './App.css';


// NB: this is the 2nd top most access point to the React frontend application
class App extends Component {

    componentWillMount() {
        // Before rendering anything, store the pathname that the user tries to access
        const { pathname: accessedPathname } = window.location;
        this.props.loadUser(accessedPathname);
    }

    render() {
        const { t, user } = this.props;

        return (
            <div className='body' style={ { overflow: 'auto', minHeight: 100 } }>
                <div className="App-content">
                    <Router>
                        <BaseLayout t={ t } user={ user }>
                            <AppNavigation t={ t } user={ user }/>
                        </BaseLayout>
                    </Router>
                </div>

                <footer className="App-footer">
                    <p>{ t('footer.message') }</p>
                    <p>&copy;LaMaS2019</p>
                </footer>
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {
    user: state.user,
} );

const mapDispatchToProps = {
    loadUser,
};

export { App };
export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(App));
