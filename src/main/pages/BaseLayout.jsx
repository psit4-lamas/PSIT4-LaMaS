import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import i18n from '../../i18n';
import { Grid } from 'semantic-ui-react';
import LoadingPage from './LoadingPage';
import TopMenuUnauthenticated from '../ComponentMenu/TopMenuUnauthenticated';
import TopMenu from '../ComponentMenu/TopMenu';
import LecturePage from './LecturePage';
import './BaseLayout.css';


class BaseLayout extends Component {

    changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    render() {
        const { t, user } = this.props;
        const { pathname } = window.location;

        if (user === undefined || user.isLoadingUser) {
            return (
                <>
                    <LoadingPage/>
                </>
            );
        }

        return (
            <>
                <header>
                    {/* TODO: fix this TopMenu */ }
                    { user.isLoadingUser || !user.isAuthenticated
                      ? (<TopMenuUnauthenticated t={ t } changeLanguage={ this.changeLanguage }/>)
                      : (<TopMenu t={ t } changeLanguage={ this.changeLanguage } user={ user } isStudent={ user.isStudent }/>)
                    }
                </header>

                <main id="page-content">
                    { (user.isLoadingUser || !user.isAuthenticated || !pathname.includes('/courses')) &&
                        <Grid centered={ true } columns={ 3 }>
                            <Grid.Column width={ 10 }>{ this.props.children }</Grid.Column>
                        </Grid>
                    }

                    <Route path={ '/courses/:subject_id/:subject' }
                           render={ (props) => <LecturePage t={ t }
                                                            key={ props.match.params.subject_id }
                                                            isStudent={ user.isStudent }
                           /> }
                    />
                </main>
            </>
        );
    }
}

export { BaseLayout };
export default BaseLayout;
