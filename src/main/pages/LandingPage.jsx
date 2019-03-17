import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import './LandingPage.css';

class LandingPage extends Component {

    onBookmarkedLinkClick = (pathname) => {
        this.props.history.push(pathname);
    };

    // TODO: improve landing page UI (Sprint 2)
    render() {
        const { t } = this.props;
        const { activeTabs } = this.props.tabs;

        return (
            <React.Fragment>
                <h1>{ t('landingPage.title') }</h1>

                <ul>
                    { activeTabs.map((activeTab, index) => (
                        <li key={ activeTab }>
                            <Link
                                to={ `/courses/${ activeTab.replace(' ', '%20') }` }
                                onClick={ () => this.onBookmarkedLinkClick(`/courses/${ activeTab.replace(' ', '%20') }`) }
                            >
                                { activeTab }
                            </Link>
                        </li>
                    )) }
                </ul>

            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ( {
    tabs: state.tabs,
} );

const mapDispatchToProps = {};

export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(withRouter(LandingPage)));
