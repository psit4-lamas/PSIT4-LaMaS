import React, { Component } from 'react';
import CreateSubject from '../CreateSubject/CreateSubject';
import { withNamespaces } from 'react-i18next';


class CreateSubjectPage extends Component {
    render() {
        const { t } = this.props;
        return (
            <React.Fragment>
                <CreateSubject t={ t }/>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(CreateSubjectPage);
