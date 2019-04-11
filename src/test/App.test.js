import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { App } from '../main/App';
import { UploadComponent } from '../main/UploadComponent/UploadComponent';

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

it('UploadComponent renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UploadComponent buttonLabel={ 'Add video' } fileType={ 'V' }/>, div);

    ReactDOM.unmountComponentAtNode(div);
});
