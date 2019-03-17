import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { Grid } from 'semantic-ui-react';
import TopMenuUnauthenticated from '../ComponentMenu/TopMenuUnauthenticated';
import TopMenu from '../ComponentMenu/TopMenu';
import './BaseLayout.css';


class BaseLayout extends Component {

    changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    // TODO: improve base page UI (Sprint 2)
    render() {
        const { t, user } = this.props;
        const { activeTabs } = this.props.tabs;
        const { pathname } = window.location;

        return (
            <React.Fragment>
                <header>
                    {/* TODO: fix this TopMenu */}
                    { user.isLoadingUser || !user.isAuthenticated ? (
                        <TopMenuUnauthenticated t={ t } changeLanguage={ this.changeLanguage } />
                    ) : (
                        <TopMenu t={ t } changeLanguage={ this.changeLanguage } activeTabs={ activeTabs } />
                    )}
                </header>

                {/* TODO: fix matching TopMenu clicked items with Route content shown (below) */}
                <main id="page-content">
                    <Grid columns={ 3 }>
                        <Grid.Column width={ 3 }>
                            {/* TODO: add left aside menu (listing lectures of a specific subject) */}
                            { user.isLoadingUser || !user.isAuthenticated || pathname === '/home' || pathname === '/' ? (
                                ''
                            ) : (
                                <>
                                    <p>lecture 1</p>
                                    <p>lecture 2</p>
                                    <p>lecture 3</p>
                                </>
                            ) }
                        </Grid.Column>
                        <Grid.Column width={ 10 }>
                            { this.props.children }
                        </Grid.Column>
                    </Grid>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    tabs: state.tabs,
});

const mapDispatchToProps = {};

export { BaseLayout };
export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(BaseLayout));
