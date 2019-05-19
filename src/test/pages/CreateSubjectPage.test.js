import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import CreateSubjectPage from '../../main/pages/CreateSubjectPage';


describe('CreateSubjectPage', () => {
    let renderedComponent;

    const propsIsStudent = {
        t: jest.fn(),
        user: {
            isAdmin: false,
            isStudent: true,
        },
    };

    const propsIsTutor = {
        t: jest.fn(),
        user: {
            isAdmin: false,
            isStudent: false,
        },
    };

    const propsIsAdmin = {
        t: jest.fn(),
        user: {
            isAdmin: true,
            isStudent: false,
        },
    };

    it('renders STUDENT view without crashing', () => {
        const div = document.createElement('div');

        shallow(<CreateSubjectPage { ...propsIsStudent } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders TUTOR view without crashing', () => {
        const div = document.createElement('div');

        shallow(<CreateSubjectPage { ...propsIsTutor } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders ADMIN view without crashing', () => {
        const div = document.createElement('div');

        shallow(<CreateSubjectPage { ...propsIsAdmin } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    describe('should match snapshot', () => {

        afterEach(() => {
            renderedComponent.unmount();
        });

        it('for a STUDENT', () => {
            const component = <CreateSubjectPage { ...propsIsStudent } />;

            renderedComponent = shallow(component);

            expect(renderedComponent.find('#error403').get(0)).toBeTruthy();
            expect(renderedComponent.find('#create-subject').get(0)).toBeFalsy();
            expect(renderedComponent).toMatchSnapshot();
        });

        it('for a TUTOR', () => {
            const component = <CreateSubjectPage { ...propsIsTutor } />;

            renderedComponent = shallow(component);

            expect(renderedComponent.find('#error403').get(0)).toBeTruthy();
            expect(renderedComponent.find('#create-subject').get(0)).toBeFalsy();
            expect(renderedComponent).toMatchSnapshot();
        });

        it('for an ADMIN', () => {
            const component = <CreateSubjectPage { ...propsIsAdmin } />;

            renderedComponent = shallow(component);

            expect(renderedComponent.find('#error403').get(0)).toBeFalsy();
            expect(renderedComponent.find('#create-subject').get(0)).toBeTruthy();
            expect(renderedComponent).toMatchSnapshot();
        });
    });
});
