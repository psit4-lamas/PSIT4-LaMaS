import React from 'react';
import ReactDOM from 'react-dom';
import i18n from '../../i18n';
import { create } from 'react-test-renderer';
import { DisplayVideo } from '../../main/LectureComponents/DisplayVideo';

describe('Top menu', () => {
    let div;
    let props;
    let component;
    let rootInstance;

    beforeEach(() => {
        div = document.createElement('div');
        props = {
            t: (key) => key,
            videoUrl: 'https://firebasestorage.googleapis.com/v0/b/fir-and-react-55a5a.appspot.com/o/files%2F9786e06c-3be2-4090-80f2-6fc28d2eb2dd.mp4?alt=media&token=70d24a4c-a2d0-4d1f-bb22-07913c61f845'
        };


        component = create(<DisplayVideo {...props} />);
        rootInstance = component.root;
    });

    it('renders without crashing', () => {
        const intern = i18n.default;
        console.log(intern.language);
        console.log(i18n.languages);

        const menu = <DisplayVideo {...props} />;
        ReactDOM.render(menu, div);

        console.log(i18n.language);

        ReactDOM.unmountComponentAtNode(div);
    });
});