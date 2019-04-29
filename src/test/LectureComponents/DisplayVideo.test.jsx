import React from 'react';
import { shallow } from 'enzyme/build';
import { DisplayVideo } from '../../main/LectureComponents/DisplayVideo';


describe('DisplayVideo', () => {
    const videoUrl =
        'https://firebasestorage.googleapis.com/v0/b/fir-and-react-55a5a.appspot.com/o/files%2F9786e06c-3be2-4090-80f2-6fc28d2eb2dd.mp4?alt=media&token=70d24a4c-a2d0-4d1f-bb22-07913c61f845';
    const nameOnStorage = 'files/9786e06c-3be2-4090-80f2-6fc28d2eb2dd.mp4';

    it('should match Snapshot with VideoUrl', () => {
        const component = shallow(<DisplayVideo t={ (key) => key } videoUrl={ videoUrl } nameOnStorage={ nameOnStorage }/>);

        expect(component).toMatchSnapshot();

        component.unmount();
    });

    it('should match Snapshot without VideoUrl', () => {
        const component = shallow(<DisplayVideo t={ (key) => key } nameOnStorage={ nameOnStorage }/>);

        expect(component).toMatchSnapshot();

        component.unmount();
    });
});
