import React from 'react';
import { shallow } from 'enzyme';
import { BaseLayout } from '../../main/pages/BaseLayout';
import { LecturePage } from '../../main/pages/LecturePage';


describe('BaseLayout', () => {
    let renderedComponent;

    const user = Object.freeze({
        isLoadingUser: true,
    });

    const userReady = Object.freeze({
        isLoadingUser: false,
        isAuthenticated: true,
        isStudent: false,
    });

    const match = {
        params: {
            subject_id: 'ddddeeee',
        },
    };

    beforeEach(() => {
        const component = <BaseLayout t={ (key) => key } user={ user } match={ match }/>;

        renderedComponent = shallow(component);
    });

    afterEach(() => {
        renderedComponent.unmount();
    });

    it('should match snapshot', () => {
        expect(renderedComponent).toMatchSnapshot();
    });

    it('should match snapshot user not loading', () => {
        const component = <BaseLayout t={ (key) => key } user={ userReady } match={ match }/>;
        renderedComponent = shallow(component);

        expect(renderedComponent).toMatchSnapshot();
        expect(renderedComponent.find(<LecturePage/>).get(0)).toBeFalsy();
    });

    it('should match snapshot rendering LecturePage', () => {
        const matchSubject = {
            params: {
                subject_id: '012345',
                subject: 'PSIT4',
            },
        };
        const component = <BaseLayout t={ (key) => key } user={ userReady } match={ matchSubject }/>;
        renderedComponent = shallow(component);

        expect(renderedComponent).toMatchSnapshot();
        expect(renderedComponent.find(<LecturePage/>)).toBeTruthy();
    });

    it('handles change of language correctly', () => {
        const component = <BaseLayout t={ (key) => key } user={ userReady } match={ match }/>;

        renderedComponent = shallow(component);
        renderedComponent.instance().changeLanguage('de');

        expect(renderedComponent).toMatchSnapshot();
        expect(renderedComponent.find(<LecturePage/>).get(0)).toBeFalsy();
    });
});
