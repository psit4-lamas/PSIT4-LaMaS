import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import i18n from '../../i18n';
import { Grid } from 'semantic-ui-react';
import TopMenuUnauthenticated from '../ComponentMenu/TopMenuUnauthenticated';
import TopMenu from '../ComponentMenu/TopMenu';
import LecturePage from './LecturePage';
import './BaseLayout.css';


class BaseLayout extends Component {

    changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    // TODO: improve base page UI (Sprint 2)
    render() {
        const { t, user } = this.props;
        const { pathname } = window.location;

        return (
            <React.Fragment>
                <header>
                    {/* TODO: fix this TopMenu */ }
                    { user.isLoadingUser || !user.isAuthenticated
                      ? (<TopMenuUnauthenticated t={ t } changeLanguage={ this.changeLanguage }/>)
                      : (<TopMenu t={ t } changeLanguage={ this.changeLanguage }/>)
                    }
                </header>

                {/* TODO: fix matching TopMenu clicked items with Route content shown (below) */ }
                <main id="page-content">
                    { (user.isLoadingUser || !user.isAuthenticated || !pathname.includes('/courses')) &&
                        <Grid centered={ true } columns={ 3 }>
                            <Grid.Column width={ 10 }>{ this.props.children }</Grid.Column>
                        </Grid>
                    }

                    <Switch>
                        <Route path={ '/courses/:subject_id/:subject' } render={ () => <LecturePage t={ t }/> }/>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}


export default BaseLayout;
