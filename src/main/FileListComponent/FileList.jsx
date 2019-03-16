import React, {Component} from 'react';
import fire from '../../firebase';
import {Table} from 'semantic-ui-react';


class FileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            files: [],
            type: props.type,
        };
    }

    nameForStructure(type) {
        if (type == 'V') {
            return 'Video';
        } else if (type == 'E') {
            return 'Exercise materials';
        } else if (type == 'L') {
            return 'Lecture Materials';
        } else {
            return 'other';
        }
    }

    colorForStructure(type) {
        if (type == 'V') {
            return 'teal';
        } else if (type == 'E') {
            return 'purple';
        } else if (type == 'L') {
            return 'blue';
        } else {
            return 'other';
        }
    }

    componentDidMount() {
        this.setState({loading: true});

        this.unsubscribe = fire
            .database()
            .collection('files')
            .where('subject', '==', 'KI')
            .where('type', '==', this.state.type)
            .onSnapshot((snapshot) => {
                let files = [];

                snapshot.forEach((doc) => {
                    let save = this;
                    fire.storage()
                        .ref(doc.data().nameOnStorage)
                        .getDownloadURL()
                        .then(function (url) {
                            console.log(url);
                            files.push({...doc.data(), uid: doc.id, downloadURL: url});
                            save.setState({
                                files,
                                loading: false,
                            });
                        });
                });

                this.setState({
                    files,
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const fileList = this.state.files.map(function (dbEntry) {
            return (
                <Table.Row>
                    <Table.Cell>
                        <a href={ dbEntry.downloadURL }>
                            { dbEntry.nameOnStorage } for subject { dbEntry.subject } and lecture { dbEntry.lecture }
                        </a>
                    </Table.Cell>
                    <Table.Cell/>
                </Table.Row>
            );
        });
        return (
            <Table color={ this.colorForStructure(this.state.type) } key={ this.colorForStructure(this.state.type) }>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{ this.nameForStructure(this.state.type) }</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{ fileList }</Table.Body>
            </Table>
        );
    }
}


export default FileList;
