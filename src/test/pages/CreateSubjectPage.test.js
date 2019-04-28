import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme/build';
import { CreateSubjectPage } from '../../main/pages/CreateSubjectPage';

describe('CreateSubjectPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<CreateSubjectPage { ...propsStudent } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    const propsNotStudent = {
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

    it('should render correctly for student', () => {
        const component = shallow(<CreateSubjectPage { ...propsStudent } />);

        expect(component).toMatchSnapshot();

        component.unmount();
    });

    it('should render correctly for not students', () => {
        const component = shallow(<CreateSubjectPage { ...propsNotStudent } />);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});
