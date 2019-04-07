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
        availableTutors: availableTutors.slice(),
    };

    handleAddition = (e) => {
        const tutorName = e.target.value ? e.target.value : e.target.textContent;
        const submitTutors = this.state.availableTutors.slice();
        submitTutors.push({
            key: tutorName,
            text: tutorName,
            value: tutorName,
        });

        this.setState({
            availableTutors: submitTutors,
        });
    };

    handleSubjectChange = (e) => {
        this.setState({
            subject: e.target.value,
        });
    };

    handleDropdownChange = (e) => {
        const newTutor = e.target.value ? e.target.value : e.target.textContent;
        const updatedTutors = this.state.selectedTutors.slice();
        updatedTutors.push(newTutor);

        this.setState({ selectedTutors: updatedTutors });
    };

    handleSubmit = () => {
        const { subject, selectedTutors } = this.state;

        this.props.createSubject(subject, selectedTutors);

        this.setState({
            submittedSubject: subject,
            submittedTutors: selectedTutors,
            subject: '',
            selectedTutors: [],
        });
    };

    render() {
        const { availableTutors, subject, selectedTutors, submittedSubject, submittedTutors } = this.state;
        const { t, responseSubject } = this.props;
        console.log('availableTutors', selectedTutors, availableTutors);

        return (
            <div>
                { responseSubject && responseSubject.subject_id !== '' ? (
                    <Message success>
                        <Message.Header>{ t('createSubject.successMsgTitle') }</Message.Header>
                        <p>
                            { t('createSubject.successMsgBox1') }
                            { submittedSubject }
                            { t('createSubject.successMsgBox2') }
                            { submittedTutors && submittedTutors.length > 0 && submittedTutors.join(', ') }
                            { t('createSubject.successMsgBox3') }
                        </p>
                    </Message>
                ) : <p>ERROR</p> }

                <Form onSubmit={ this.handleSubmit }>
                    <Form.Field>
                        <label>{ t('createSubject.subjectFieldLbl') }</label>
                        <Form.Input placeholder={ t('createSubject.subjectFieldPlaceholder') }
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
                            onAddItem={ (e) => this.handleAddition(e) }
                            onChange={ (e) => this.handleDropdownChange(e) }
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
export default withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(CreateSubject));
