import React from 'react';
import ReactDOM from 'react-dom';
import App from '../main/App';
import UserLoginForm from '../main/ComponentLogin/UserLoginForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);

  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserLoginForm />, div);

  ReactDOM.unmountComponentAtNode(div);
});