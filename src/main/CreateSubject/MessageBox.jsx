import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';


class MessageBox extends Component {

    renderSuccessMessage = () => {
        const { t, submittedSubject, submittedSubjectFullName, submittedTutors } = this.props;

        return (
            <Message success>
                <Message.Header>{ t('createSubject.successMsgTitle') }</Message.Header>
                <p>
                    { t('createSubject.successMsgBox1') }
                    <strong>{ submittedSubjectFullName }</strong> (<strong>{ submittedSubject }</strong>)
                    { t('createSubject.successMsgBox2') }
                    <strong>{ submittedTutors && submittedTutors.length > 0 && submittedTutors.join(', ') }</strong>
                    { t('createSubject.successMsgBox3') }
                </p>
            </Message>
        );
    };

    renderErrorMessage = () => {
        const { t, submittedSubject, submittedSubjectFullName, submittedTutors } = this.props;

        return (
            <Message negative>
                <Message.Header>{ t('createSubject.negativeMsgTitle') }</Message.Header>
                <p>
                    { t('createSubject.negativeMsgBox1') }
                    <strong>{ submittedSubjectFullName }</strong> (<strong>{ submittedSubject }</strong>)
                    { t('createSubject.negativeMsgBox2') }
                    <strong>{ submittedTutors && submittedTutors.length > 0 && submittedTutors.join(', ') }</strong>
                    { t('createSubject.negativeMsgBox3') }
                </p>
            </Message>
        );
    };

    render() {
        const { responseSubject } = this.props;

        return (
            <div style={ { marginBottom: '25px' } }>
                { responseSubject.currentSubject.subject_id ? this.renderSuccessMessage() : this.renderErrorMessage() }
            </div>
        );
    }
}


export default MessageBox;
