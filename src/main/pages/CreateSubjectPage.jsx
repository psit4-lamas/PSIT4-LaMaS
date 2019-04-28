import React, { Component } from 'react';
import CreateSubject from '../CreateSubject/CreateSubject';
import Error403 from '../Error403';


class CreateSubjectPage extends Component {

    render() {
        const { t, user } = this.props;

        if (user.isStudent) {
            return (
                <>
                    <Error403 location={ { pathname: '/createsubject', pageName: 'Create Subject' } }/>
                </>
            );
        }

        return (
            <>
                <br/>
                <h1>{ t('createSubject.pageTitle') }</h1>
                <br/>

                <CreateSubject t={ t }/>
            </>
        );
    }
}

export default CreateSubjectPage;
