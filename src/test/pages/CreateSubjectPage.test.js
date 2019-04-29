import React from 'react';
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

    afterEach(() => {
        renderedComponent.unmount();
    });

    describe('should match snapshot', () => {
        it('if user.isStudent', () => {
            const component = <CreateSubjectPage { ...propsIsStudent } />;

            renderedComponent = shallow(component);

            expect(renderedComponent).toMatchSnapshot();
        });

        it('if not', () => {
            const component = <CreateSubjectPage { ...propsIsNotStudent } />;

            renderedComponent = shallow(component);

            expect(renderedComponent).toMatchSnapshot();
        });
    });
});
