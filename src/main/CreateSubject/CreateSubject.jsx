import React, { Component } from 'react';
import { withNameSpacesAndRedux } from '../../utils';
import { createSubject, leaveCreateSubject } from '../actions';
import { Dropdown, Form, Segment } from 'semantic-ui-react';
import MessageBox from './MessageBox';
import LoadingPage from '../pages/LoadingPage';


const availableTutors = [
    {
        key: 'Patrick Baumgartner',
        text: 'Patrick Baumgartner',
        value: 'Patrick Baumgartner',
    },
    {
        key: 'Hans Doran',
        text: 'Hans Doran',
        value: 'Hans Doran',
    },
];


class CreateSubject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            subjectFullName: '',
            selectedTutors: [],
            submittedSubject: '',
            submittedSubjectFullName: '',
            submittedTutors: [],
            availableTutors: availableTutors.slice(),
        };
    }

    componentWillUnmount() {
        this.props.leaveCreateSubject();
    }

    handleAddition = (e, { value }) => {
        this.setState({
            availableTutors: [{
                text: value,
                value,
            }, ...this.state.availableTutors],
        });
    };

    handleSubjectChange = (e) => {
        this.setState({
            subject: e.target.value,
        });
    };

    handleSubjectFullNameChange = (e) => {
        this.setState({
            subjectFullName: e.target.value,
        });
    };

    handleDropdownChange = (e, { value }) => {
        this.setState({ selectedTutors: value });
    };

    handleSubmit = () => {
        const { subject, subjectFullName, selectedTutors } = this.state;

        // Prevent admin from accidentally submitting a form without subject name or tutors
        if (subject !== '' && selectedTutors.length > 0) {
            this.props.createSubject(subject, subjectFullName, selectedTutors);

            this.setState({
                submittedSubject: subject,
                submittedSubjectFullName: subjectFullName,
                submittedTutors: selectedTutors,
                subject: '',
                subjectFullName: '',
                selectedTutors: [],
            });
        }
    };

    render() {
        const {
            availableTutors, subject, subjectFullName, selectedTutors,
            submittedSubject, submittedSubjectFullName, submittedTutors } = this.state;
        const { t, responseSubject } = this.props;

        return (
            <div>
                { !!responseSubject && !!submittedSubject && responseSubject.isLoadingSubject &&
                  <Segment>
                      <LoadingPage/>
                  </Segment>
                }

                { !!responseSubject && responseSubject.isSubmitted && !responseSubject.isLoadingSubject &&
                    <MessageBox
                        t={ t }
                        responseSubject={ responseSubject }
                        submittedSubject={ submittedSubject }
                        submittedSubjectFullName={ submittedSubjectFullName }
                        submittedTutors={ submittedTutors }
                    />
                }

                <Form onSubmit={ this.handleSubmit }>
                    <Form.Field required>
                        <label>{ t('createSubject.subjectFieldLbl') }</label>
                        <Form.Input
                            placeholder={ t('createSubject.subjectFieldPlaceholder') }
                            name="subject"
                            value={ subject }
                            onChange={ (e) => this.handleSubjectChange(e) }
                        />

                        <label>{ t('createSubject.subjectFullNameFieldLbl') }</label>
                        <Form.Input
                            placeholder={ t('createSubject.subjectFullNameFieldPlaceholder') }
                            name="subject-full-name"
                            value={ subjectFullName }
                            onChange={ (e) => this.handleSubjectFullNameChange(e) }
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
    leaveCreateSubject,
};

export { CreateSubject };
export default withNameSpacesAndRedux(mapStateToProps, mapDispatchToProps, CreateSubject);
