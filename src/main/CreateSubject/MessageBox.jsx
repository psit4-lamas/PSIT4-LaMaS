import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';


class MessageBox extends Component {
    render() {
        const { t, responseSubject, submittedSubject, submittedTutors } = this.props;

        return (
            <div>
                { responseSubject.isSubmitted && responseSubject.currentSubject.subject_id ? (
                    <Message success>
                        <Message.Header>{ t('createSubject.successMsgTitle') }</Message.Header>
                        <p>
                            { t('createSubject.successMsgBox1') }
                            <strong>{ submittedSubject }</strong>
                            { t('createSubject.successMsgBox2') }
                            <strong>{ submittedTutors && submittedTutors.length > 0 && submittedTutors.join(', ') }</strong>
                            { t('createSubject.successMsgBox3') }
                        </p>
                    </Message>
                ) : null }
                { responseSubject.isSubmitted && !responseSubject.currentSubject.subject_id ? (
                    <Message negative>
                        <Message.Header>{ t('createSubject.negativeMsgTitle') }</Message.Header>
                        <p>
                            { t('createSubject.negativeMsgBox1') }
                            <strong>{ submittedSubject }</strong>
                            { t('createSubject.negativeMsgBox2') }
                            <strong>{ submittedTutors && submittedTutors.length > 0 && submittedTutors.join(', ') }</strong>
                            { t('createSubject.negativeMsgBox3') }
                        </p>
                    </Message>
                ) : null }
            </div>
        );
    }
}


export default MessageBox;
