import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LectureBodyContent from '../LectureComponents/LectureBodyContent';
import './LecturePage.css';


class LecturePage extends Component {

    // TODO: improve lecture page UI (Sprint 2)
    render() {
        const { pathname } = this.props;
        const subject = pathname.replace('/courses/', '').replace('%20', ' ');

        return (
            <React.Fragment>
                {/* TODO: add proper routes for tutor VS student view */}
                <Route exact path={ `${ pathname }` } render={ () => <LectureBodyContent pathname={ subject }/> }/>
                {/*<Route exact path={ `${ this.props.base }/:subj` } render={ ({ match }) => <LectureBodyContent match={ match }/> }/>*/ }
            </React.Fragment>
        );
    }
}


export default withRouter(LecturePage);
