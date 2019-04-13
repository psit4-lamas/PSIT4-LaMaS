import React, { Component } from 'react';
import { Icon, Item, Table } from 'semantic-ui-react';
import { withRouterAndRedux } from '../../utils';
import { downloadFileFromFirebase } from '../actions';
import UploadComponent from '../UploadComponent/UploadComponent';


class FileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            files: [],
            type: 'V',
        };
    }

    colorForStructure = (type) => {
        if (type === 'V') {
            return 'teal';
        } else if (type === 'E') {
            return 'purple';
        } else if (type === 'L') {
            return 'blue';
        } else {
            return 'orange';
        }
    };

    filesForStructure = (type) => {
        if (type === 'V') {
            return this.props.lectureVideos.videos;
        } else if (type === 'E') {
            return this.props.lectureVideos.exercises;
        } else if (type === 'L') {
            return this.props.lectureVideos.lecture_materials;
        } else {
            return null;
        }
    };

    handleClick(nameOnStorage) {
        this.props.downloadFileFromFirebase(nameOnStorage);
    }

    render() {
        const { t, type, editMode } = this.props;
        const files = this.filesForStructure(type);

        const fileList = Object.keys(files).map((element) => {
            return (
                <Table.Row key={ files[element].nameOnStorage }>
                    <Table.Cell width={ 14 }>
                        <Item.Group>
                            <Item>
                                <Item.Content verticalAlign="middle">
                                    <Item.Header name="file" as="a" onClick={ () => this.handleClick(files[element].nameOnStorage) }>
                                        <Icon name="download"/>
                                        { files[element].name }
                                    </Item.Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Table.Cell>
                    <Table.Cell>
                        <button style={ { display: 'none' } } className="ui icon button">
                            <i className="trash alternate icon">X</i>
                        </button>
                    </Table.Cell>
                </Table.Row>
            );
        });

        return (
            <Table color={ this.colorForStructure(type) } key={ this.colorForStructure(type) }>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={ 14 }>{ t('fileList.' + type) } </Table.HeaderCell>
                        <Table.HeaderCell width={ 2 }>{ t('fileList.action') }</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { fileList }
                    <Table.Row>
                        <Table.Cell collapsing>{ editMode ? <UploadComponent fileType={ type } buttonLabel={ t('uploadComponent.add') }/> : null }</Table.Cell>
                        <Table.Cell/>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}


const mapStateToProps = (state) => ( {
    lectureVideos: state.subject.currentSubject.lectures[state.subject.currentLectureID],
} );

const mapDispatchToProps = {
    downloadFileFromFirebase,
};

export { FileList };
export default withRouterAndRedux(mapStateToProps, mapDispatchToProps, FileList);
