import React from 'react';
import { shallow } from 'enzyme';
import { BaseLayout } from '../../main/pages/BaseLayout';


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
    });

    it('handles change of language correctly', () => {
        const component = <BaseLayout t={ (key) => key } user={ userReady } match={ match }/>;

        renderedComponent = shallow(component);
        renderedComponent.instance().changeLanguage('de');

        expect(renderedComponent).toMatchSnapshot();
    });
});
