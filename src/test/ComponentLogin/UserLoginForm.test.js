import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { UserLoginForm } from '../../main/ComponentLogin/UserLoginForm';
import { Form } from 'semantic-ui-react';


describe('UserLoginForm', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UserLoginForm t={ (key) => key }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('sets email state value if email is entered', () => {
        const loginform = shallow(<UserLoginForm t={ (key) => key }/>);
        const event = { target: { value: 'testemail' } };

        loginform.find({ name: 'email' }).simulate('change', event);
        expect(loginform.state('email')).toEqual(event.target.value);

        loginform.unmount();
    });

    it('sets password state value if password is entered', () => {
        const loginform = shallow(<UserLoginForm t={ (key) => key }/>);
        const event = { target: { value: 'testpassword' } };

        loginform.find({ name: 'password' }).simulate('change', event);
        expect(loginform.state('password')).toEqual(event.target.value);

        loginform.unmount();
    });

    it('calls logIn if Login button is clicked', () => {
        const logIn = jest.fn();
        const loginform = mount(<UserLoginForm t={ (key) => key } logIn={ logIn }/>);
        const emailfield = loginform.find({ name: 'email' }).at(1);
        const passwordfield = loginform.find({ name: 'password' }).at(1);

        emailfield.simulate('change', { target: { value: 'test@testmail.org' } });
        passwordfield.simulate('change', { target: { value: 'thisismypassword' } });
        loginform.find(Form).simulate('submit');

        expect(logIn).toHaveBeenCalledWith('test@testmail.org', 'thisismypassword');

        loginform.unmount();
    });

    it('calls logIn with invalid credentials', () => {
        const logIn = jest.fn();
        const loginform = mount(<UserLoginForm t={ (key) => key } logIn={ logIn }/>);
        expect(loginform.find({ id: 'user-not-found' }).length).toEqual(0);

        // Simulate setting errorMessage state attribute for invalid login case
        loginform.setState({ errorMessage: 'error' });
        expect(loginform.find({ id: 'user-not-found' }).length).not.toEqual(0);
        expect(loginform.find({ id: 'user-not-found' })).toBeTruthy();

        loginform.unmount();
    });

    it('should render correctly', () => {
        const component = shallow(<UserLoginForm t={ (key) => key }/>);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});
