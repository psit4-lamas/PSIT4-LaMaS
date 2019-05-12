import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import CreateSubjectPage from '../../main/pages/CreateSubjectPage';


describe('CreateSubjectPage', () => {
    let renderedComponent;

    const propsIsStudent = {
        t: jest.fn(),
        user: {
            isStudent: true,
        },
    };

    const propsIsNotStudent = {
        t: jest.fn(),
        user: {
            isStudent: false,
        },
    };

    it('renders student view without crashing', () => {
        const div = document.createElement('div');

        shallow(<CreateSubjectPage { ...propsIsStudent } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders non-student view without crashing', () => {
        const div = document.createElement('div');

        shallow(<CreateSubjectPage { ...propsIsNotStudent } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    describe('should match snapshot', () => {

        afterEach(() => {
            renderedComponent.unmount();
        });

        it('for a student', () => {
            const component = <CreateSubjectPage { ...propsIsStudent } />;

            renderedComponent = shallow(component);

            expect(renderedComponent.find('#error403').get(0)).toBeTruthy();
            expect(renderedComponent.find('#create-subject').get(0)).toBeFalsy();
            expect(renderedComponent).toMatchSnapshot();
        });

        it('for a non-student', () => {
            const component = <CreateSubjectPage { ...propsIsNotStudent } />;

            renderedComponent = shallow(component);

            expect(renderedComponent.find('#error403').get(0)).toBeFalsy();
            expect(renderedComponent.find('#create-subject').get(0)).toBeTruthy();
            expect(renderedComponent).toMatchSnapshot();
        });
    });
});
