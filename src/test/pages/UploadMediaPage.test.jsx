import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import UploadMediaPage from '../../main/pages/UploadMediaPage';


describe('UploadMediaPage', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<UploadMediaPage { ...props } />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    let uploadMediaPageComponent;

    const props = {
        editMode: false,
        t: (key) => key,
        onSelectVideoClick: jest.fn(),
        onSelectFileClick: jest.fn(),
        lecture: {
            is_public: false,
            name: '',
            videos: {},
            lecture_materials: {},
            exercises: {},
            comments: {},
        },
    };

    beforeEach(() => {
        const component = <UploadMediaPage { ...props } />;

        uploadMediaPageComponent = shallow(component);
    });

    afterEach(() => {
        uploadMediaPageComponent.unmount();
    });

    it('should render correctly', () => {
        expect(uploadMediaPageComponent).toMatchSnapshot();
    });
});
