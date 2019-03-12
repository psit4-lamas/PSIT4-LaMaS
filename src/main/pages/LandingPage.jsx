import React, { Component } from 'react';
import TopMenu from '../ComponentMenu/TopMenu';
import LectureBodyContent from '../LectureComponents/LecturesContainer';
import { Route } from 'react-router-dom';


class LandingPage extends Component {

    // TODO: improve landing page UI (Sprint 2)
    render() {
        console.log('LandingPage ', this.props.base);
        return (
            <React.Fragment>
                <header>
                    <TopMenu/>
                </header>

                {/*TODO: fix matching TopMenu clicked items with Route content shown (below) */}
                <main>
                    Llamacorn
                    <Route exact path={ `${ this.props.base }/:subj` } render={ ({ match }) => <LectureBodyContent match={ match }/> }/>
                </main>

                <footer>Feet</footer>
            </React.Fragment>
        );
    }
}

export default LandingPage;
