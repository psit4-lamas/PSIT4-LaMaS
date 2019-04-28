import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { LandingPage } from '../../main/pages/LandingPage';

describe('LandingPage', () => {
    let renderedComponent;

    const props = {
        loadSubjectHead: jest.fn(),
        tabs : {
            activeTabs: [
                "MQMO",
                "MANIT1",
            ],
            isLoadingTabs: false,
            subjectLinks: [
                {
                    name: "MQMO",
                    subject_id: "2D0MoB57yByiAQhLSGnK",
                },
                {
                    name: "MANIT1",
                    subject_id: "4phGM2c4dZxkTs5QliLQ",
                },
            ],
        },
    };

    // it('renders without crashing', () => {
    //     const div = document.createElement('div');
    //
    //     ReactDOM.render(<BaseLayout t={ (key) => key } user={ user } />, div);
    //     ReactDOM.unmountComponentAtNode(div);
    // });

    beforeEach(() => {

        const component = <LandingPage t={ (key) => key } { ...props }/>;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });
});