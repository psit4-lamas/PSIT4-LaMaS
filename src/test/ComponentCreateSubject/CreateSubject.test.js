import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { CreateSubject } from '../../main/CreateSubject/CreateSubject';
import { Form } from 'semantic-ui-react';

describe('CreateSubject', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const responseSubject = {};

        ReactDOM.render(<CreateSubject t={ (key) => key } responseSubject={ responseSubject }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });


    let createSubjectComponent;
    let createSubject;
    let responseSubject;

    const subjectEvent = Object.freeze({ target: { name: 'subject', value: 'SubjectName' } });
    const tutorsDefault = Object.freeze({ target: null });
    const tutorsEvent = Object.freeze({ value: ['TutorName'] });

    beforeEach(() => {
        createSubject = jest.fn();
        responseSubject = {};

        const component = (
            <CreateSubject
                t={ (key) => key }
                createSubject={ createSubject }
                responseSubject={ responseSubject }
            />);

        createSubjectComponent = shallow(component);
    });

    afterEach(() => {
        createSubjectComponent.unmount();
    });

    it('should render correctly', () => {
        expect(createSubjectComponent).toMatchSnapshot();
    });

    it('sets subject state value if subject is entered', () => {
        createSubjectComponent.find({ name: 'subject' }).simulate('change', subjectEvent);
        expect(createSubjectComponent.state('subject')).toEqual(subjectEvent.target.value);
    });

    it('sets selectedTutors state value if tutors are entered', () => {
        createSubjectComponent.find('Dropdown').prop('onChange')(tutorsDefault, tutorsEvent);
        expect(createSubjectComponent.state('selectedTutors')).toEqual(tutorsEvent.value);
    });

    it('calls createSubject if Save button is clicked with valid form values', () => {
        const subjectfield = createSubjectComponent.find({ name: 'subject' });
        const tutorfield = createSubjectComponent.find({ name: 'tutors' });

        subjectfield.simulate('change', subjectEvent);
        tutorfield.prop('onChange')(tutorsDefault, tutorsEvent);
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubject).toHaveBeenCalledWith(subjectEvent.target.value, tutorsEvent.value);
    });

    it('updates state if Save button is clicked', () => {
        const subjectfield = createSubjectComponent.find({ name: 'subject' });
        const tutorfield = createSubjectComponent.find({ name: 'tutors' });

        subjectfield.simulate('change', subjectEvent);
        tutorfield.prop('onChange')(tutorsDefault, tutorsEvent);
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubjectComponent.state('subject')).toEqual('');
        expect(createSubjectComponent.state('selectedTutors')).toEqual([]);
        expect(createSubjectComponent.state('submittedSubject')).toEqual(subjectEvent.target.value);
        expect(createSubjectComponent.state('submittedTutors')).toEqual(tutorsEvent.value);
    });

    it('prevents user from submitting with missing form value', () => {
        const subjectfield = createSubjectComponent.find({ name: 'subject' });

        subjectfield.simulate('change', subjectEvent);
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubjectComponent.state('subject')).toEqual(subjectEvent.target.value);
        expect(createSubjectComponent.state('selectedTutors')).toEqual([]);
        expect(createSubjectComponent.state('submittedSubject')).toEqual('');
        expect(createSubjectComponent.state('submittedTutors')).toEqual([]);

        expect(createSubject).not.toHaveBeenCalled();
    });

    it('displays success message box on success', () => {
        const responseSubject = {
            isSubmitted: true,
            subject_id: 123,
        };

        createSubjectComponent = mount(<CreateSubject t={ (key) => key } responseSubject={ responseSubject }/>);

        expect(createSubjectComponent.find('.ui.success.message').get(0)).toBeTruthy();
        expect(createSubjectComponent.find('.ui.negative.message').get(0)).toBeFalsy();
    });

    it('displays negative message box on failure', () => {
        const responseSubject = {
            isSubmitted: true,
            subject_id: null,
        };

        createSubjectComponent = mount(<CreateSubject t={ (key) => key } responseSubject={ responseSubject }/>);

        expect(createSubjectComponent.find('.ui.success.message').get(0)).toBeFalsy();
        expect(createSubjectComponent.find('.ui.negative.message').get(0)).toBeTruthy();
    });

    it('calls handleAddition onAddItem', () => {
        const availableTutorsBefore = [
            { key: 'Patrick Baumgartner', text: 'Patrick Baumgartner', value: 'Patrick Baumgartner' },
            { key: 'Hans Doran', text: 'Hans Doran', value: 'Hans Doran' },
            { key: 'Renate Kummer', text: 'Renate Kummer', value: 'Renate Kummer' },
        ];
        const availableTutorsAfter = [
            { text: 'TutorName', value: 'TutorName' },
            { key: 'Patrick Baumgartner', text: 'Patrick Baumgartner', value: 'Patrick Baumgartner' },
            { key: 'Hans Doran', text: 'Hans Doran', value: 'Hans Doran' },
            { key: 'Renate Kummer', text: 'Renate Kummer', value: 'Renate Kummer' },
        ];
        const responseSubject = {};
        createSubjectComponent = shallow(<CreateSubject t={ (key) => key } responseSubject={ responseSubject } availableTutors={ availableTutorsBefore }/>);
        const tutorfield = createSubjectComponent.find({ name: 'tutors' });

        const changeValue = { value: 'TutorName' };
        tutorfield.prop('onAddItem')(tutorsDefault, changeValue);

        expect(createSubjectComponent.state('availableTutors')).toEqual(availableTutorsAfter);
    });
});
