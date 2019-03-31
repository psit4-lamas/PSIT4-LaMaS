import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withNameSpacesAndRouterAndRedux } from '../../utils';
import { loadSubject, loadSubjectHead } from '../actions';
import './LandingPage.css';


class LandingPage extends Component {

    componentDidMount() {
        this.props.loadSubjectHead();
    }

    onBookmarkedLinkClick = (subjectLink) => {
        const pathname = `/courses/${ subjectLink.subject_id }/${ subjectLink.name.replace(' ', '%20') }`;
        this.props.history.push(pathname);
    };

    handleClick = (e) => {
        e.preventDefault();
        this.props.loadSubject(e.target.value);
    };

    // TODO: improve landing page UI (Sprint 2)
    render() {
        const { t } = this.props;
        const { activeTabs, subjectLinks } = this.props.tabs;

        return (
            <React.Fragment>
                <h1>{ t('landingPage.title') }</h1>

                <ul>
                    { activeTabs.map((activeTab, index) => (
                        <li key={ activeTab }>
                            <Link
                                to={ `/courses/${ subjectLinks[index].subject_id + '/'
                                                  + subjectLinks[index].name.replace(' ', '%20') }` }
                                onClick={ () => this.onBookmarkedLinkClick(subjectLinks[index]) }
                            >
                                { activeTab }
                            </Link>
                            <button value={ subjectLinks[index].subject_id } onClick={ this.handleClick }>
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
