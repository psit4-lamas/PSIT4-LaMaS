import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginGuard from './LoginGuard';
import SecureGuard from './SecureGuard';
import LoginPage from '../pages/LoginPage';
import LandingPage from '../pages/LandingPage';
// import TopMenu from '../ComponentMenu/TopMenu';
import LecturesContainer from '../LectureComponents/LecturesContainer';


const AppNavigation = () => (
    <Router>
        <Switch>
            <Route
                exact
                path={ '/login' }
                render={ () => (
                    <LoginGuard>
                        <LoginPage/>
                    </LoginGuard>
                ) }
            />
            <Route
                path={ '/' }
                render={ () => (
                    <SecureGuard>
                        {/* NB: here is the top most location under className App-content */ }
                        {/*     where TopMenu Component can be placed as parent Component */ }
                        {/* TODO: make TopMenu to add a tab with the corresponding subject name */ }
                        {/*       based on the child Component content (Sprint 2) */ }
                        {/*<TopMenu/>*/}
                        {/* TODO: replace these pathnames with the proper pathnames and their corresponding page Components */ }
                        <Route path={ '/lectures' } render={ () => <LecturesContainer base={ '/lectures' }/> }/>
                        <Route exact path={ '/home' } render={ () => <LandingPage base={ '/home' }/> }/>
                        <Route exact path={ '/' } render={ () => <LandingPage base={ '/home' }/> }/>
                    </SecureGuard>
                ) }
            />
            {/* NB: this is the default fallback Route: any unmatched Route should be redirected to /index.js */}
            <Route render={ () => <Redirect to={ '/' }/> }/>
        </Switch>
    </Router>
);

export default AppNavigation;
