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
        const createSubjectComponent = mount(<CreateSubject t={ (key) => key } createSubject={ createSubject }/>);
        const subjectfield = createSubjectComponent.find({ name: 'subject' }).at(1);
        const tutorfield = createSubjectComponent.find({ name: 'tutors' }).at(1);

        subjectfield.simulate('change', { target: { value: 'SubjectName' } });
        tutorfield.simulate('change', { target: { value: 'Tutor1, Tutor2' } });
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubject).toHaveBeenCalledWith('SubjectName', 'Tutor1');

        loginform.unmount();
    });

    it('updates state if Save button is clicked', () => {
        const createSubject = jest.fn();
        const createSubjectComponent = mount(<CreateSubject t={ (key) => key } createSubject={ createSubject }/>);
        const subjectfield = createSubjectComponent.find({ name: 'subject' }).at(1);
        const tutorfield = createSubjectComponent.find({ name: 'tutors' }).at(1);

        subjectfield.simulate('change', { target: { value: 'SubjectName' } });
        tutorfield.simulate('change', { target: { value: 'Tutor1, Tutor2' } });
        createSubjectComponent.find(Form).simulate('submit');

        expect(createSubjectComponent.state('submittedSubject')).toEqual(createSubjectComponent.state('subject'));
        expect(createSubjectComponent.state('submittedTutors')).toEqual(createSubjectComponent.state('selectedTutors'));
        expect(createSubjectComponent.state('subject')).toBe('');
        expect(createSubjectComponent.state('selectedTutors')).toBe([]);
        expect(createSubjectComponent.state('submitSuccess')).toBeTruthy();

        loginform.unmount();
    });

    it('should render correctly', () => {
        const component = shallow(<CreateSubject t={ (key) => key }/>);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});