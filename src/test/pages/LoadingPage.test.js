import React from 'react';
import { shallow } from 'enzyme/build';
import { LoadingPage } from '../../main/pages/LoadingPage';

describe('LoadingPage', () => {
    it('should render correctly', () => {
        const component = shallow(<LoadingPage/>);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});
