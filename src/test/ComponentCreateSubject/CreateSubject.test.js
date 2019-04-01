import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
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
        const event = { target: { value: 'Tutor1, Tutor2' } };

        createSubjectComponent.find({ name: 'tutors' }).simulate('change', event);
        expect(createSubjectComponent.state('selectedTutors')).toEqual(event.target.value);

        createSubjectComponent.unmount();
    });

    it('calls createSubject if Save button is clicked', () => {
        const createSubject = jest.fn();
        const responseSubject = { subject_id: '01234' };
        const createSubjectComponent = mount(<CreateSubject t={ (key) => key } createSubject={ createSubject } responseSubject={ responseSubject }/>);
        const subjectfield = createSubjectComponent.find({ name: 'subject' }).at(3);
        const tutorfield = createSubjectComponent.find({ name: 'tutors' }).at(1);

        const subjectEvent = { target: { value: 'SubjectName' } };
        const tutorsEvent = { target: { value: [{ text: 'Tutor1' }, { text: 'Tutor2' }] } };

        subjectfield.simulate('change', subjectEvent);
        tutorfield.simulate('change', tutorsEvent);
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubject).toHaveBeenCalledWith(subjectEvent.target.value, tutorsEvent.target.value);

        createSubjectComponent.unmount();
    });

    it('updates state if Save button is clicked', () => {
        const createSubject = jest.fn();
        const responseSubject = { subject_id: '01234' };
        const createSubjectComponent = mount(<CreateSubject t={ (key) => key } createSubject={ createSubject } responseSubject={ responseSubject }/>);
        const subjectfield = createSubjectComponent.find({ name: 'subject' }).at(3);
        const tutorfield = createSubjectComponent.find({ name: 'tutors' }).at(1);

        const subjectEvent = { target: { value: 'SubjectName' } };
        const tutorsEvent = { target: { value: [{ text: 'Tutor1' }, { text: 'Tutor2' }] } };

        subjectfield.simulate('change', subjectEvent);
        tutorfield.simulate('change', tutorsEvent);
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubjectComponent.state('subject')).toEqual('');
        expect(createSubjectComponent.state('selectedTutors')).toEqual([]);
        expect(createSubjectComponent.state('submittedSubject')).toEqual(subjectEvent.target.value);
        expect(createSubjectComponent.state('submittedTutors')).toEqual(tutorsEvent.target.value);

        createSubjectComponent.unmount();
    });

    it('should render correctly', () => {
        const createSubject = jest.fn();
        const component = shallow(<CreateSubject t={ (key) => key } createSubject={ createSubject }/>);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});
