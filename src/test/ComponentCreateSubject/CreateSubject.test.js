import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { CreateSubject } from '../../main/CreateSubject/CreateSubject';
import { Form } from 'semantic-ui-react';

describe('CreateSubject', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreateSubject t={ (key) => key }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('sets subject state value if subject is entered', () => {
        const createSubjectComponent = shallow(<CreateSubject t={ (key) => key }/>);
        const event = { target: { name: 'subject', value: 'mySubject' } };

        createSubjectComponent.find({ name: 'subject' }).simulate('change', event);
        expect(createSubjectComponent.state('subject')).toEqual(event.target.value);

        createSubjectComponent.unmount();
    });

    it('sets selectedTutors state value if tutors are entered', () => {
        const createSubjectComponent = shallow(<CreateSubject t={ (key) => key }/>);
        const changeEvent = { target: null };
        const changeValue = { value: ['TutorName'] };

        createSubjectComponent.find('Dropdown').prop('onChange')(changeEvent, changeValue);
        expect(createSubjectComponent.state('selectedTutors')).toEqual(['TutorName']);

        createSubjectComponent.unmount();
    });

    it('calls createSubject if Save button is clicked', () => {
        const createSubject = jest.fn();
        const responseSubject = { subject_id: '01234' };
        const createSubjectComponent = shallow(<CreateSubject t={ (key) => key } createSubject={ createSubject } responseSubject={ responseSubject }/>);
        const subjectfield = createSubjectComponent.find({ name: 'subject' });
        const tutorfield = createSubjectComponent.find({ name: 'tutors' });

        const subjectEvent = { target: { value: 'SubjectName' } };
        const tutorsEvent = { target: null };
        const changeValue = { value: ['TutorName'] };

        subjectfield.simulate('change', subjectEvent);
        tutorfield.prop('onChange')(tutorsEvent, changeValue);
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubject).toHaveBeenCalledWith(subjectEvent.target.value, changeValue.value);

        createSubjectComponent.unmount();
    });

    it('updates state if Save button is clicked', () => {
        const createSubject = jest.fn();
        const responseSubject = { subject_id: '01234' };
        const createSubjectComponent = shallow(<CreateSubject t={ (key) => key } createSubject={ createSubject } responseSubject={ responseSubject }/>);
        const subjectfield = createSubjectComponent.find({ name: 'subject' });
        const tutorfield = createSubjectComponent.find({ name: 'tutors' });

        const subjectEvent = { target: { value: 'SubjectName' } };
        const tutorsEvent = { target: null };
        const changeValue = { value: ['TutorName'] };

        subjectfield.simulate('change', subjectEvent);
        tutorfield.prop('onChange')(tutorsEvent, changeValue);
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubjectComponent.state('subject')).toEqual('');
        expect(createSubjectComponent.state('selectedTutors')).toEqual([]);
        expect(createSubjectComponent.state('submittedSubject')).toEqual(subjectEvent.target.value);
        expect(createSubjectComponent.state('submittedTutors')).toEqual(changeValue.value);

        createSubjectComponent.unmount();
    });

    it('should render correctly', () => {
        const createSubject = jest.fn();
        const component = shallow(<CreateSubject t={ (key) => key } createSubject={ createSubject }/>);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});
