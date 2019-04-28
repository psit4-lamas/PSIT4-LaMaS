import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withNameSpacesAndRouterAndRedux } from '../../utils';
import { loadSubject, loadSubjectHead } from '../actions';
import './LandingPage.css';


class LandingPage extends Component {

    componentDidMount() {
        this.props.loadSubjectHead();
    }

    onBookmarkedLinkClick = (activeTab) => {
        const pathname = `/courses/${ activeTab.subject_id }/${ activeTab.subject_name.replace(' ', '%20') }`;
        this.props.history.push(pathname);
    };

    handleClick = (e) => {
        e.preventDefault();
        this.props.loadSubject(e.target.value);
    };

    // TODO: improve landing page UI (Sprint 2)
    render() {
        const { t } = this.props;
        const { activeTabs } = this.props.tabs;

        return (
            <React.Fragment>
                <br/>
                <h1>{ t('landingPage.title') }</h1>

                <ul>
                    { activeTabs.map(activeTab => (
                        <li key={ activeTab.subject_id }>
                            <Link
                                to={ `/courses/${ activeTab.subject_id }/${ activeTab.subject_name.replace(' ', '%20') }` }
                                onClick={ () => this.onBookmarkedLinkClick(activeTab) }
                            >
                                { activeTab.subject_name }
                            </Link>
                            <button value={ activeTab.subject_id } onClick={ this.handleClick }>
                                Click me ;-)
                            </button>
                        </li>
                    )) }
                </ul>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    tabs: state.tabs,
});

const mapDispatchToProps = {
    loadSubject,
    loadSubjectHead,
};

export { LandingPage };
export default withNameSpacesAndRouterAndRedux(mapStateToProps, mapDispatchToProps, LandingPage);
