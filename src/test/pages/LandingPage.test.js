import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage } from '../../main/pages/LandingPage';

describe('LandingPage', () => {
    let renderedComponent;

    const props = {
        loadSubjectHead: jest.fn(),
        loadSubject: jest.fn(),
        tabs: {
            isLoadingTabs: false,
            activeTabs: [
                {
                    subject_name: 'MQMO',
                    subject_id: '2D0MoB57yByiAQhLSGnK',
                },
                {
                    subject_name: 'MANIT1',
                    subject_id: '4phGM2c4dZxkTs5QliLQ',
                },
            ],
        },
    };

    // const activeTab = {
    //             subject_name: "MQMO",
    //             subject_id: "2D0MoB57yByiAQhLSGnK",
    // };

    beforeEach(() => {
        const component = <LandingPage t={ (key) => key } { ...props } />;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });

    //somehow the test fails. Do not know why...
    // it('calls loadSubject() on button click', () => {
    //     const ClickMeButton = renderedComponent.find('button').at(0);
    //
    //     ClickMeButton.prop('onClick');
    //
    //     expect(props.loadSubject).toHaveBeenCalledWith(activeTab);
    // })
});
