import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


class FileList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            files: [],
            type: props.type,
        };
    }

    nameForStructure = (type) => {
        if (type === 'V') {
            return 'Video';
        } else if (type === 'E') {
            return 'Exercise Materials';
        } else if (type === 'L') {
            return 'Lecture Materials';
        } else {
            return 'other';
        }
    };

    colorForStructure = (type) => {
        if (type === 'V') {
            return 'teal';
        } else if (type === 'E') {
            return 'purple';
        } else if (type === 'L') {
            return 'blue';
        } else {
            return 'other';
        }
    };

    componentDidMount() {
        this.setState({ loading: true });
        const { firebase: fire } = this.props;

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
                        .then(function(url) {
                            console.log(url);

                            files.push({ ...doc.data(), uid: doc.id, downloadURL: url });

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
        const fileList = this.state.files.map((dbEntry) => {
            return (
                <Table.Row key={ dbEntry.nameOnStorage }>
                    <Table.Cell width={ 12 }>
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
                        <Table.HeaderCell width={ 12 }>{ this.nameForStructure(this.state.type) }</Table.HeaderCell>
                        <Table.HeaderCell width={ 12 }>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{ fileList }</Table.Body>
            </Table>
        );
    }
}


export default FileList;
