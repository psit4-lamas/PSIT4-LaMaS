import React from 'react';
import ReactDOM from 'react-dom';
import { LandingPage } from '../../main/pages/LandingPage';
import { shallow } from 'enzyme/build';
import { Link } from 'react-router-dom';

describe('LandingPage', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<LandingPage { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    const props = {
        t: (key) => key,
        loadSubjectHead: jest.fn(),
        loadSubject: jest.fn(),
        history: [],
        tabs: {
            activeTabs: [
                {
                    subject_id: 'dfajlsdfja',
                    subject_name: 'PSIT4',
                },
                {
                    subject_id: 'dasfawed',
                    subject_name: 'PSIT2',
                },
            ],
        },
    };

    const propsEmpty = {
        t: (key) => key,
        loadSubjectHead: jest.fn(),
        loadSubject: jest.fn(),
        history: [],
        tabs: {
            activeTabs: [ ],
        },
    };

    it('should render correctly', () => {
        const component = shallow(<LandingPage { ...props } />);

        expect(component).toMatchSnapshot();

        component.unmount();
    });

    it('should render correctly with no tabs', () => {
        const component = shallow(<LandingPage { ...propsEmpty } />);

        expect(component).toMatchSnapshot();

        component.unmount();
    });

    it('calls loadSubject on click to element', () => {
        const component = shallow(<LandingPage { ...props } />);

        component.find(Link).first().simulate('click');
        expect(props.history).toHaveLength(1);

        const pathname = `/courses/dfajlsdfja/${ "PSIT4".replace(' ', '%20') }`;
        expect(props.history[0]).toEqual(pathname);

        component.unmount();
    });
});
