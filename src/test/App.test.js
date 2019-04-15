import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../main/App';

it('App renders without crashing', () => {
    const user = {
        isAuthenticated: false,
        isLoadingUser: true,
        userAccessedPathname: '',
    };

    const component = shallow(<App t={ (key) => key } loadUser={ jest.fn() } user={ user }/>);

    expect(component).toMatchSnapshot();

    component.unmount();
});
