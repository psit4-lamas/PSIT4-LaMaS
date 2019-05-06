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

    renderFileList(key, file) {
        const { nameOnStorage, name, is_public } = file;
        const { isDeleteImplemented, editMode, t, type } = this.props;

        return (
            <Table.Row key={ nameOnStorage }>
                <Table.Cell width={ 14 }>
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

                { ( isDeleteImplemented || editMode ) && (
                    <Table.Cell>
                        { type === 'E' ? <Checkbox name={ key } toggle label={ t('fileList.publish') } defaultChecked={ is_public } onChange={ this.onFilePublishChange }/> : '' }
                        <button style={ { display: 'none' } } className="ui icon button"/>
                    </Table.Cell>
                ) }
            </Table.Row>
        );
    }

    render() {
        const { t, type, editMode, subject, lecture } = this.props;
        const files = !isEmptyObject(lecture) ? this.filesForStructure(type) : {};
        const { isDeleteImplemented } = this.props;

        return (
            <Table color={ this.colorForStructure(type) } key={ this.colorForStructure(type) }>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={ 14 }>{ t('fileList.' + type) } </Table.HeaderCell>
                        { ( isDeleteImplemented || editMode ) && <Table.HeaderCell width={ 2 }>{ t('fileList.action') }</Table.HeaderCell> }
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

                    { !isEmptyObject(files) ? (
                        Object.keys(files).map((index) => {
                            if (files[index].is_public || editMode) {
                                return this.renderFileList(index, files[index]);
                            }

                            return null;
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
