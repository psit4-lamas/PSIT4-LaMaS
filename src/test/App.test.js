import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../main/App';
import UploadComponent from '../main/UploadComponent/UploadComponent';

it('App renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<App t={ (key) => key }/>, div);

    ReactDOM.unmountComponentAtNode(div);
});

it('UploadComponent renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UploadComponent buttonLabel={ 'Add video' } fileType={ 'V' }/>, div);

    ReactDOM.unmountComponentAtNode(div);
});
