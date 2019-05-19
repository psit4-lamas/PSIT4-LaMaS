import React, { Component } from 'react';
import CreateSubject from '../CreateSubject/CreateSubject';
import Error403 from '../Error403';


class CreateSubjectPage extends Component {
    render() {
        const { t, user } = this.props;

        if (!user.isAdmin) {
            return (
                <>
                    <Error403 id="error403" t={ t } location={ {
                        pathname: '/createsubject',
                        pageName: 'Create Subject',
                    } }/>
                </>
            );
        }

        return (
            <>
                <br/>
                <h1>{ t('createSubject.pageTitle') }</h1>
                <br/>

                <CreateSubject id="create-subject" t={ t }/>
            </>
        );
    }
}


export { CreateSubjectPage };
export default CreateSubjectPage;
