import React, { Component } from 'react';
import TopMenu from '../ComponentMenu/TopMenu';


class LandingPage extends Component {

    // TODO: improve landing page UI
    render() {
        return (
            <div>
                <header>
                    <TopMenu/>
                </header>

                <main>Llamacorn</main>

                <footer>Feet</footer>
            </div>
        );
    }
}

export default LandingPage;
