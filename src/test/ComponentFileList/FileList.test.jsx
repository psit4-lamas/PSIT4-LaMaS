import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FileList from '../../main/FileListComponent/FileList';
import { UploadComponent } from '../../main/UploadComponent/UploadComponent';


describe('FileList', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');

        shallow(<FileList t={ (key) => key } { ...propsVideos } onSelectFile={ jest.fn() }/>, div);
        shallow(<FileList t={ (key) => key } { ...propsLectureMaterials } onSelectFile={ jest.fn() }/>, div);
        shallow(<FileList t={ (key) => key } { ...propsExercises } onSelectFile={ jest.fn() }/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    let fileListComponent;
    let onSelectFile;

    const propsVideos = {
        isStudent: false,
        type: 'V',
        editMode: false,
        t: (key) => key,
        lecture: {
            videos: {
                videos_01: {
                    nameOnStorage: 'files/fdd95078-367b-4c21-b395-0bcbae435d2f.mox',
                    name: 'modell.css',
                },
                videos_02: {
                    nameOnStorage: 'files/fdd95078-367b-4c21-b395-0eeee435d2f.mox',
                    name: 'modell2.css',
                },
            },
        },
    };

    const propsLectureMaterials = {
        isStudent: false,
        type: 'L',
        editMode: false,
        t: (key) => key,
        lecture: {
            lecture_materials: {
                lecture_materials_01: {
                    nameOnStorage: 'files/fdd95222-367b-4c21-b395-0bcbae435d2f.mox',
                    name: 'modell33.css',
                },
                lecture_materials_02: {
                    nameOnStorage: 'files/fdd95111-367b-4c21-b395-0eeee435d2f.mox',
                    name: 'modell233.css',
                },
            },
        },
    };

    const propsExercises = {
        isStudent: false,
        type: 'E',
        editMode: false,
        t: (key) => key,
        lecture: {
            exercises: {
                exercises_01: {
                    nameOnStorage: 'files/11195222-367b-4c21-b395-0bcbae435d2f.mox',
                    name: 'modell3333.css',
                    is_public: true
                },
                exercises_02: {
                    nameOnStorage: 'files/22295111-367b-4c21-b395-0eeee435d2f.mox',
                    name: 'modell23322.css',
                    is_public: true
                },
            },
        },
    };

    const propsExercisesStudent = {
        isStudent: true,
        type: 'E',
        editMode: false,
        t: (key) => key,
        lecture: {
            exercises: {
                exercises_01: {
                    nameOnStorage: 'files/11195222-367b-4c21-b395-0bcbae435d2f.mox',
                    name: 'modell3333.css',
                    is_public: false
                },
                exercises_02: {
                    nameOnStorage: 'files/22295111-367b-4c21-b395-0eeee435d2f.mox',
                    name: 'modell23322.css',
                    is_public: false
                },
            },
        },
    };

    const propsEmpty = {
        isStudent: false,
        type: 'E',
        editMode: false,
        t: (key) => key,
        lecture: {},
    };

    const propsEmptyAndDelete = {
        isStudent: false,
        type: 'E',
        isDeleteImplemented: true,
        editMode: false,
        t: (key) => key,
        lecture: {},
    };

    const propsWithDelete = {
        isStudent: false,
        type: 'E',
        editMode: false,
        t: (key) => key,
        lecture: {
            exercises: {
                exercises_01: {
                    nameOnStorage: 'files/11195222-367b-4c21-b395-0bcbae435d2f.mox',
                    name: 'modell3333.css',
                    is_public: true
                },
                exercises_02: {
                    nameOnStorage: 'files/22295111-367b-4c21-b395-0eeee435d2f.mox',
                    name: 'modell23322.css',
                    is_public: true
                },
            },
        },
        isDeleteImplemented: true,
    };

    const propsWithDeleteAndEditMode = {
        type: 'L',
        editMode: true,
        t: (key) => key,
        lecture: {
            exercises: {
                exercises_01: {
                    nameOnStorage: 'files/11195222-367b-4c21-b395-0bcbae435d2f.mox',
                    name: 'modell3333.css',
                    is_public: true
                },
                exercises_02: {
                    nameOnStorage: 'files/22295111-367b-4c21-b395-0eeee435d2f.mox',
                    name: 'modell23322.css',
                    is_public: true
                },
            },
        },
        isDeleteImplemented: true,
    };

    const propsEditMode = {
        type: 'L',
        editMode: true,
        t: (key) => key,
        lecture: {
            exercises: {
                exercises_01: {
                    nameOnStorage: 'files/11195222-367b-4c21-b395-0bcbae435d2f.mox',
                    name: 'modell3333.css',
                    is_public: true
                },
                exercises_02: {
                    nameOnStorage: 'files/22295111-367b-4c21-b395-0eeee435d2f.mox',
                    name: 'modell23322.css',
                },
            },
        },
        isDeleteImplemented: false,
    };

    beforeEach(() => {
        onSelectFile = jest.fn();

        const component = <FileList { ...propsVideos } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);
    });

    afterEach(() => {
        fileListComponent.unmount();
    });

    it('should render correctly videos', () => {
        expect(fileListComponent).toMatchSnapshot();
    });

    it('should render correctly lecture materials', () => {
        const component = <FileList { ...propsLectureMaterials } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);

        expect(fileListComponent).toMatchSnapshot();
    });

    it('should render correctly exercises', () => {
        const component = <FileList { ...propsExercises } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);

        expect(fileListComponent).toMatchSnapshot();
    });

    it('should render correctly exercises for student view', () => {
        const component = <FileList { ...propsExercisesStudent } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);

        expect(fileListComponent).toMatchSnapshot();
    });

    it('should render correctly empty', () => {
        const component = <FileList { ...propsEmpty } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);

        expect(fileListComponent).toMatchSnapshot();
    });

    it('should render correctly with deleted implemented', () => {
        const component = <FileList { ...propsWithDelete } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);

        expect(fileListComponent).toMatchSnapshot();
    });

    it('should render correctly with editMode', () => {
        const component = <FileList { ...propsEditMode } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);

        expect(fileListComponent).toMatchSnapshot();
    });

    it('should render correctly with editMode and deleted', () => {
        const component = <FileList { ...propsWithDeleteAndEditMode } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);

        expect(fileListComponent).toMatchSnapshot();
    });

    it('should render correctly with empty and deleteImplemented', () => {
        const component = <FileList { ...propsEmptyAndDelete } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);

        expect(fileListComponent).toMatchSnapshot();
    });

    it('calls handler function if clicked on element', () => {
        const component = <FileList { ...propsExercises } onSelectFile={ onSelectFile }/>;
        fileListComponent = shallow(component);
        const videoEvent = {
            target: {
                value: propsVideos.lecture.videos.videos_01.nameOnStorage,
                getAttribute() {
                    return propsVideos.lecture.videos.videos_01.nameOnStorage;
                },
            },
        };
        fileListComponent
            .find({ name: 'file' })
            .at(0)
            .prop('onClick')(videoEvent);
        expect(onSelectFile).toHaveBeenCalledWith(videoEvent.target.value);
    });

    it('renders add button not if not edit mode', () => {
        expect(fileListComponent.find(<UploadComponent/>).get(0)).toBeFalsy();
    });

    it('returns correct files for type videos', () => {
        const files = fileListComponent.instance().filesForStructure('V');
        expect(files).toEqual(propsVideos.lecture.videos);
    });

    it('returns correct files for type lecture materials', () => {
        const component = <FileList { ...propsLectureMaterials } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);
        const files = fileListComponent.instance().filesForStructure('L');

        expect(files).toEqual(propsLectureMaterials.lecture.lecture_materials);
    });

    it('returns correct files for type exercises', () => {
        const component = <FileList { ...propsExercises } onSelectFile={ onSelectFile }/>;

        fileListComponent = shallow(component);
        const files = fileListComponent.instance().filesForStructure('E');

        expect(files).toEqual(propsExercises.lecture.exercises);
    });
});
