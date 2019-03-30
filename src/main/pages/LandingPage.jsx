import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withNameSpacesAndRouterAndRedux } from '../../utils';
import { loadSubject, loadSubjectHead } from '../actions';
import './LandingPage.css';


class LandingPage extends Component {

    componentDidMount() {
        this.props.loadSubjectHead();
    }

    onBookmarkedLinkClick = (pathname) => {
        this.props.history.push(pathname);
    };

    handleClick = (e) => {
        e.preventDefault();
        this.props.loadSubject('ja41PsLoHDJAsyjGfGx6');
    };

    // TODO: improve landing page UI (Sprint 2)
    render() {
        const { t } = this.props;
        const { activeTabs, subjectIds } = this.props.tabs;

        return (
            <React.Fragment>
                <h1>{ t('landingPage.title') }</h1>

                <ul>
                    { activeTabs.map((activeTab, index) => (
                        <li key={ activeTab }>
                            <Link
                                to={ `/courses/${ subjectIds[index] + '/' + activeTab.replace(' ', '%20') }` }
                                onClick={ () => this.onBookmarkedLinkClick(`/courses/${ activeTab.replace(' ', '%20') }`) }
                            >
                                { activeTab }
                            </Link>
                            <button onClick={ this.handleClick }>Click me ;-)</button>
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

export default withNameSpacesAndRouterAndRedux(mapStateToProps, mapDispatchToProps, LandingPage);
