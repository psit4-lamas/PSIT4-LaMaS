import React, { Component } from 'react';
import { withNameSpacesAndRedux } from '../../utils';
import { createSubject } from '../actions';
import { Dropdown, Form } from 'semantic-ui-react';
import MessageBox from './MessageBox';

const availableTutors = [
    { key: 'Patrick Baumgartner', text: 'Patrick Baumgartner', value: 'Patrick Baumgartner' },
    { key: 'Hans Doran', text: 'Hans Doran', value: 'Hans Doran' },
    { key: 'Renate Kummer', text: 'Renate Kummer', value: 'Renate Kummer' },
];


class CreateSubject extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            subject: '',
            selectedTutors: [],
            submittedSubject: '',
            submittedTutors: [],
            availableTutors: availableTutors.slice(),
        };
    }

    handleAddition = (e, { value }) => {
        this.setState({
            availableTutors: [{ text: value, value }, ...this.state.availableTutors],
        });
    };

    handleSubjectChange = (e) => {
        this.setState({
            subject: e.target.value,
        });
    };

    handleDropdownChange = (e, { value }) => {
        this.setState({ selectedTutors: value });
    };

    handleSubmit = () => {
        const { subject, selectedTutors } = this.state;

        // Prevent admin from accidentally submitting a form without subject name or tutors
        if (subject !== '' && selectedTutors.length > 0) {
            this.props.createSubject(subject, selectedTutors);

            this.setState({
                submittedSubject: subject,
                submittedTutors: selectedTutors,
                subject: '',
                selectedTutors: [],
            });
        }
    };

    render() {
        const { availableTutors, subject, selectedTutors, submittedSubject, submittedTutors } = this.state;
        const { t, responseSubject } = this.props;

        return (
            <div>
                { responseSubject.isSubmitted && responseSubject.subject_id !== null ? (
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
                { responseSubject.isSubmitted && responseSubject.subject_id === null ? (
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

                <Form onSubmit={ this.handleSubmit }>
                    <Form.Field>
                        <label>{ t('createSubject.subjectFieldLbl') }</label>
                        <Form.Input
                            placeholder={ t('createSubject.subjectFieldPlaceholder') }
                            name="subject"
                            value={ subject }
                            onChange={ (e) => this.handleSubjectChange(e) }
                        />
                        <label>{ t('createSubject.tutorFieldLbl') }</label>
                        <Dropdown
                            options={ availableTutors }
                            placeholder={ t('createSubject.tutorFieldPlaceholder') }
                            name="tutors"
                            search
                            selection
                            fluid
                            multiple
                            allowAdditions
                            value={ selectedTutors }
                            onAddItem={ (e, { value }) => this.handleAddition(e, { value }) }
                            onChange={ (e, { value }) => this.handleDropdownChange(e, { value }) }
                        />
                    </Form.Field>
                    <Form.Button content={ t('createSubject.saveBtn') }/>
                </Form>
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {
    responseSubject: state.subject,
} );

const mapDispatchToProps = {
    createSubject,
};

export { CreateSubject };
export default withNameSpacesAndRedux(mapStateToProps, mapDispatchToProps, CreateSubject);
