import React from 'react';
import ReactDOM from 'react-dom';
import { UserLoginForm } from '../../main/ComponentLogin/UserLoginForm';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserLoginForm t={ (key) => key }/>, div);

    ReactDOM.unmountComponentAtNode(div);
});
