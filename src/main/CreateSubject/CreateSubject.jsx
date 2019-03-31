import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSubject } from '../actions';
import { Form, Message, Dropdown } from 'semantic-ui-react';
import { withNamespaces } from 'react-i18next';

const availableTutors = [
    { key: 'Patrick Baumgartner', text: 'Patrick Baumgartner', value: 'Patrick Baumgartner' },
    { key: 'Hans Doran', text: 'Hans Doran', value: 'Hans Doran' },
    { key: 'Renate Kummer', text: 'Renate Kummer', value: 'Renate Kummer' },
];


class CreateSubject extends Component {
    state = {
        subject: '',
        selectedTutors: [],
        submittedSubject: '',
        submittedTutors: [],
        submitSuccess: false,
        availableTutors: availableTutors.slice(),
    };

    handleAddition = (e, { value }) => {
        this.setState({
            availableTutors: [{ text: value, value }, ...this.state.availableTutors],
        });
    };

    handleSubjectChange = (e, { name, value }) => this.setState({ subject: value });

    handleDropdownChange = (e, { value }) => this.setState({ selectedTutors: value });

    handleSubmit = () => {
        const { subject, selectedTutors } = this.state;

        this.props.createSubject(subject, selectedTutors);

        this.setState({
            submittedSubject: subject,
            submittedTutors: selectedTutors,
            subject: '',
            selectedTutors: [],
            submitSuccess: true,
        });
    };

    render() {
        const { availableTutors, submitSuccess, subject, selectedTutors, submittedSubject, submittedTutors } = this.state;
        const { t } = this.props;

        return (
            <div>
                { submitSuccess ? (
                    <Message success>
                        <Message.Header>{ t('createSubject.successMsgTitle') }</Message.Header>
                        <p>
                            { t('createSubject.successMsgBox1') }
                            { submittedSubject }
                            { t('createSubject.successMsgBox2') }
                            { submittedTutors.join(', ') }
                            { t('createSubject.successMsgBox3') }
                        </p>
                    </Message>
                ) : null }

                <Form onSubmit={ this.handleSubmit }>
                    <Form.Field>
                        <label>{ t('createSubject.subjectFieldLbl') }</label>
                        <Form.Input placeholder={ t('createSubject.subjectFieldPlaceholder') } name="subject" value={ subject } onChange={ this.handleSubjectChange }/>
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
                            onAddItem={ this.handleAddition }
                            onChange={ this.handleDropdownChange }
                        />
                    </Form.Field>
                    <Form.Button content={ t('createSubject.saveBtn') }/>
                </Form>
            </div>
        );
    }
}


const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {
    createSubject,
};

export { CreateSubject };
export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(CreateSubject));
