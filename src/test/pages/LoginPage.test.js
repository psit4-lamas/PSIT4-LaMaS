import { shallow } from 'enzyme/build';
import React from 'react';
import LoginPage from '../../main/pages/LoginPage';

describe('LoginPage', () => {
    it('should render correctly', () => {
        const component = shallow(<LoginPage t={ (key) => key }/>);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});