import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject } from '../../utils';
import { Checkbox, Icon, Item, Table } from 'semantic-ui-react';
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
        }
    };

    filesForStructure = (type) => {
        const { lecture } = this.props;

        if (type === 'V') {
            return lecture.videos;
        } else if (type === 'E') {
            return lecture.exercises;
        } else if (type === 'L') {
            return lecture.lecture_materials;
        }
    };

    handleClick = (e) => {
        const nameOnStorage = e.target.getAttribute('value');
        this.props.onSelectFile(nameOnStorage);
    };

    onFilePublishChange = (event, data) => {
        this.props.onChangeFilePublish(data);
    };

    isAnyPublic = (files) => {
        const { type, isStudent } = this.props;
        if (!isStudent || (type === 'V') || (type === 'L')) {
            return true;
        }

        // Check if all 'exercise' files are publish, in order to show 'No data' or just the published files
        let showNoData = false;
        for (let index in files) {
            showNoData = showNoData || (index && !!files[index].is_public);
        }

        return showNoData;
    };

    renderExerciseRightCell = (key, is_public) => {
        const { isDeleteImplemented, editMode, t, isStudent } = this.props;
        let renderCell;

        if (isStudent) {
            renderCell = ('');
        } else if (editMode) {
            renderCell = (
                <>
                    { <Checkbox name={ key } toggle label={ t('fileList.publish') } defaultChecked={ is_public } onChange={ this.onFilePublishChange }/> }
                    { isDeleteImplemented && <button style={ { display: 'none' } } className="ui icon button"/> }
                </>
            );
        } else {
            renderCell = (
                <>
                    { is_public ? <span>{ t('fileList.publish') }</span> : <span>{ t('fileList.unpublish') }</span> }
                </>
            );
        }

        return renderCell;
    };

    renderFileList(key, file) {
        const { nameOnStorage, name, is_public } = file;
        const { isDeleteImplemented, type, isStudent } = this.props;

        if ((type === 'E' && !file.is_public) && isStudent) {
            return '';
        }

        return (
            <Table.Row key={ nameOnStorage }>
                <Table.Cell width={ 10 }>
                    <Item.Group>
                        <Item>
                            <Item.Content verticalAlign="middle">
                                <Item.Header name="file" as="a" value={ nameOnStorage } onClick={ this.handleClick }>
                                    <Icon name="download"/> { name }
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Table.Cell>

                { ( isDeleteImplemented || !isStudent ) && (
                    <Table.Cell>
                        { (type !== 'V') && (type !== 'L') && this.renderExerciseRightCell(key, is_public) }
                    </Table.Cell>
                ) }
            </Table.Row>
        );
    }

    render() {
        const { t, type, editMode, subject, lecture, isStudent } = this.props;
        const files = !isEmptyObject(lecture) ? this.filesForStructure(type) : {};
        const { isDeleteImplemented } = this.props;

        return (
            <Table color={ this.colorForStructure(type) } key={ this.colorForStructure(type) }>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={ 10 }>{ t('fileList.' + type) } </Table.HeaderCell>
                        { ( isDeleteImplemented || !isStudent ) && <Table.HeaderCell width={ 2 }>{ editMode ? t('fileList.action') : '' }</Table.HeaderCell> }
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { editMode && (
                        <Table.Row>
                            <Table.Cell collapsing>
                                <UploadComponent subject={ subject } fileType={ type } buttonLabel={ t('uploadComponent.add') }/>
                            </Table.Cell>
                            { isDeleteImplemented && <Table.Cell/> }
                        </Table.Row>
                    ) }

                    { !isEmptyObject(files) && this.isAnyPublic(files) ? (
                        Object.keys(files).map((index) => {
                            return this.renderFileList(index, files[index]);
                        })
                    ) : (
                          <Table.Row>
                              <Table.Cell collapsing>
                                  <span>{ t('fileList.noData') }</span>
                              </Table.Cell>
                              { isDeleteImplemented && <Table.Cell/> }
                          </Table.Row>
                      ) }
                </Table.Body>
            </Table>
        );
    }
}


FileList.propTypes = {
    onSelectFile: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    lecture: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

FileList.defaultProps = {
    editMode: false,
};

export default FileList;
