import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginGuard from './LoginGuard';
import SecureGuard from './SecureGuard';
import LoginPage from '../pages/LoginPage';
import LecturePage from '../pages/LecturePage';
import UploadMediaPage from '../pages/UploadMediaPage';
import LandingPage from '../pages/LandingPage';
import CreateSubjectPage from '../pages/CreateSubjectPage';


const AppNavigation = () => ( // NOSONAR
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
                    {/* TODO: replace these pathnames with the proper pathnames and their corresponding page Components */ }

                    <Switch>
                        <Route path={ '/createsubject' } render={ () => <CreateSubjectPage base={ '/createsubject' }/> }/>
                        <Route path={ '/courses/:subject_id/:subject' } render={ () => <LecturePage pathname={ window.location.pathname }/> }/>
                        <Route exact path={ '/home' } render={ () => <LandingPage/> }/>
                        <Route exact path={ '/' } render={ () => <LandingPage/> }/>
                    </Switch>
                </SecureGuard>
            ) }
        />

        {/* NB: this is the default fallback Route: any unmatched Route should be redirected to /index.js */ }
        <Route render={ () => <Redirect to={ '/' }/> }/>
    </Switch>
);

export default AppNavigation;
