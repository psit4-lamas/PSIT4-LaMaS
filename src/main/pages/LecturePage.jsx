import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import TopMenu from '../ComponentMenu/TopMenu';
import LectureBodyContent from '../LectureComponents/LectureBodyContent';
import './LecturePage.css';


class LecturePage extends Component {

    // TODO: improve lecture page UI (Sprint 2)
    render() {

        return (
            <React.Fragment>
                {/* TODO: fix this TopMenu as well as in LandingPage.jsx */}
                <header><TopMenu/></header>

                <main>
                    <h1>Lectures</h1>

                    <ul>
                        <li>
                            <Link to={ `${ this.props.base }/IS` }>IS</Link>
                        </li>
                        <li>
                            <Link to={ `${ this.props.base }/KI1` }>KI1</Link>
                        </li>
                    </ul>

                    <Route exact path={ `${ this.props.base }/:subj` } render={ ({ match }) => <LectureBodyContent match={ match }/> }/>
                </main>
            </React.Fragment>
        );
    }
}


export default withRouter(LecturePage);
