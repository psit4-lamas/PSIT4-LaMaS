import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import CreateSubjectPage from '../../main/pages/CreateSubjectPage';


describe('CreateSubjectPage', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<CreateSubjectPage { ...propsStudent } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    const propsNonStudent = {
        t: (key) => key,
        user: {
            isStudent: false,
        },
    };

    const propsStudent = {
        t: (key) => key,
        user: {
            isStudent: true,
        },
    };

    it('should render correctly for a student', () => {
        const component = shallow(<CreateSubjectPage { ...propsStudent } />);

        expect(component.find('#error403').get(0)).toBeTruthy();
        expect(component.find('#create-subject').get(0)).toBeFalsy();
        expect(component).toMatchSnapshot();

        component.unmount();
    });

    it('should render correctly for a non-student', () => {
        const component = shallow(<CreateSubjectPage { ...propsNonStudent } />);

        expect(component.find('#error403').get(0)).toBeFalsy();
        expect(component.find('#create-subject').get(0)).toBeTruthy();
        expect(component).toMatchSnapshot();

        component.unmount();
    });
});
