//TODO internationalization
//TODO formatierung usw aufräumen
//TODO test options available? renders.., funct. has been called
//

import React, { Component } from 'react';
import Fire from '../../firebase';
import { Form, Message, Dropdown } from 'semantic-ui-react';

const availableTutors = [
    { key: 'Patrick Baumgartner', text: 'Patrick Baumgartner', value: 'Patrick Baumgartner' },
    { key: 'Hans Doran', text: 'Hans Doran', value: 'Hans Doran' },
    { key: 'Peter Kummer', text: 'Peter Kummer', value: 'Peter Kummer' },
];


class CreateSubject extends Component {
    state = {
        subject: '',
        selectedTutors: '',
        submittedSubject: '',
        submittedTutors: [],
        submitSuccess: false,
        availableTutors
    };

    handleAddition = (e, { value }) => {
        this.setState({
            availableTutors: [{ text: value, value }, ...this.state.availableTutors],
        });
    };

    handleInputChange = (e, { name, value }) => this.setState({ subject: value });

    handleDropdownChange = (e, { value }) => this.setState({ selectedTutors: value });

    handleSubmit = () => {
        const { subject, selectedTutors } = this.state;
        let sendSubject = Fire.functions().httpsCallable('addSubject');

        sendSubject({ subjectName: subject, assignedTutor: selectedTutors }).then((result) => {
            console.log(result);
        });
        this.setState({
            submittedSubject: subject,
            submittedTutors: selectedTutors,
            subject: '',
            selectedTutors: '',
            submitSuccess: true,
        });
    };

    render() {
        const { subject, selectedTutors, submittedSubject, submittedTutors } = this.state;
        const { t } = this.props;

        return (
            <div>
                { this.state.submitSuccess ? (
                    <Message success>
                        <Message.Header>Subject created</Message.Header>
                        <p>
                            Subject with name { submittedSubject } and assigned tutors { submittedTutors.join(', ') } created.
                        </p>
                    </Message>
                ) : null }
                <Form onSubmit={ this.handleSubmit }>
                    <Form.Field>
                        <label>Subject Name</label>
                        <Form.Input placeholder="Subject Name" name="subject" value={ subject } onChange={ this.handleInputChange }/>
                        <Dropdown
                            options={ this.state.availableTutors }
                            placeholder="Tutors..."
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
                    <Form.Button content="Save"/>
                </Form>
            </div>
        );
    }
}

export default CreateSubject;
