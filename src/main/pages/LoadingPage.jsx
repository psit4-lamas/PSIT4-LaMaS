import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';


class LoadingPage extends Component {
    render() {
        return (
            <Dimmer active>
                <Loader/>
            </Dimmer>
        );
    }
}

export { LoadingPage };
export default LoadingPage;

