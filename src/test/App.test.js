import React from 'react';
import ReactDOM from 'react-dom';
import App from '../main/App';
import VideoUpload from '../main/VideoUploadComponent/VideoUpload';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App  t={ key => key } />, div);

  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VideoUpload />, div);

  ReactDOM.unmountComponentAtNode(div);
});
