//TODO internationalization
//TODO formatierung usw aufräumen
//TODO test options available? renders.., funct. has been called
//

import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { createSubject } from '../actions';
import { Form, Message, Dropdown } from 'semantic-ui-react';


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
            availableTutors: [ { text: value, value }, ...this.state.availableTutors ],
        });
    };

    handleInputChange = (e, { name, value }) => this.setState({ subject: value });

    handleDropdownChange = (e, { value }) => this.setState({ selectedTutors: value });

    handleSubmit = () => {
        const { subject, selectedTutors } = this.state;

        this.props.createSubject(subject, selectedTutors);

        this.setState({
            submittedSubject: subject,
            submittedTutors: selectedTutors,
            subject: '',
            selectedTutors: '',
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
                        <Message.Header>Subject created</Message.Header>
                        <p>
                            Subject with name { submittedSubject } and assigned
                            tutors { submittedTutors.join(', ') } created.
                        </p>
                    </Message>
                ) : null }

                <Form onSubmit={ this.handleSubmit }>
                    <Form.Field>
                        <label>Subject Name</label>
                        <Form.Input placeholder="Subject Name" name="subject" value={ subject }
                                    onChange={ this.handleInputChange }/>
                        <Dropdown
                            options={ availableTutors }
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


const mapStateToProps = (state) => ( {} );

const mapDispatchToProps = {
    createSubject,
};

export { CreateSubject }
export default connect(mapStateToProps, mapDispatchToProps)(CreateSubject);
