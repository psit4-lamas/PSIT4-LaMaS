import React, { Component } from 'react';
import CreateSubject from '../CreateSubject/CreateSubject';
import { withNamespaces } from 'react-i18next';


class CreateSubjectPage extends Component {

    render() {
        const { t } = this.props;

        return (
            <React.Fragment>
                <br/>
                <h1>{ t('createSubject.pageTitle') }</h1>
                <br/>

                <CreateSubject t={ t }/>
            </React.Fragment>
        );
    }
}

export { CreateSubjectPage };
export default withNamespaces()(CreateSubjectPage);
