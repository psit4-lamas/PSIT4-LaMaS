import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouterAndRedux } from '../../utils';
import { loadSubject } from '../actions/index';
import { isEmptyObject } from '../../utils';
import LectureBodyContent from '../LectureComponents/LectureBodyContent';
import LoadingPage from '../pages/LoadingPage';
import './LecturePage.css';


class LecturePage extends Component {
    // TODO: improve lecture page UI (Sprint 2)
    componentWillMount() {
        const { subject_id } = this.props.match.params;
        this.props.loadSubject(subject_id);
    }

    render() {
        const { pathname, isLoadingSubject, subject } = this.props;

        if (isLoadingSubject || isEmptyObject(subject)) {
            return <React.Fragment><LoadingPage/></React.Fragment>;
        } else {
            return (
                <React.Fragment>
                    {/* TODO: add proper routes for tutor VS student view */ }

                    <Route exact path={ `${ pathname }` }
                           render={ () => <LectureBodyContent pathname={ subject['subject_name'] }/> }/>
                    {/*<Route exact path={ `${ this.props.base }/:subj` } render={ ({ match }) => <LectureBodyContent match={ match }/> }/>*/ }
                </React.Fragment>
            );
        }
    }
}


const mapStateToProps = (state) => ({
    isLoadingSubject: state.subject.isLoadingSubject,
    subject: state.subject.currentSubject,
});

const mapDispatchToProps = {
    loadSubject,
};

export { LecturePage };
export default withRouterAndRedux(mapStateToProps, mapDispatchToProps, LecturePage);
