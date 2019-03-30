import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import LectureBodyContent from '../LectureComponents/LectureBodyContent';
import {loadSubject} from '../actions/index';
import './LecturePage.css';


class LecturePage extends Component {
    // TODO: improve lecture page UI (Sprint 2)
    render() {
        const {pathname} = this.props;
        this.props.loadSubject(this.props.match.params.subjectId);

        if (this.props.isLoadingUser) {
            return <React.Fragment>page loading ...</React.Fragment>;
        } else {
            //let { subject } = this.props.subject;
            //console.log();
            return (
                <React.Fragment>
                    {/* TODO: add proper routes for tutor VS student view */ }

                    <Route exact path={ `${ pathname }` } render={ () => <LectureBodyContent pathname={ this.props.subject['subject_name'] }/> }/>
                    {/*<Route exact path={ `${ this.props.base }/:subj` } render={ ({ match }) => <LectureBodyContent match={ match }/> }/>*/ }

                    { Object.keys(this.props.lectures).map((el) => (
                        <li className="list-group-item" key={ el }>
                            { this.props.lectures[el].name }
                        </li>
                    )) }
                </React.Fragment>
            );
        }
    }
}


const mapStateToProps = (state) => {
    return {lectures: state.subject.currentSubject.lectures, subject: state.subject.currentSubject, isLoadingUser: state.subject.isLoadingSubject};
};

const mapDispatchToProps = {
    loadSubject,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(LecturePage),
);
