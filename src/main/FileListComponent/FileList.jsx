import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


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

    componentDidMount() {
        this.setState({ loading: true });
        const { type, firebase: fire } = this.props;

        this.unsubscribe = fire
            .database()
            .collection('files')
            .where('subject', '==', 'KI')
            .where('type', '==', type)
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
        const { t, type } = this.props;
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
            <Table color={ this.colorForStructure(type) } key={ this.colorForStructure(type) }>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={ 12 }>{ t('fileList.' + type) }</Table.HeaderCell>
                        <Table.HeaderCell width={ 12 }>{ t('fileList.action') }</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{ fileList }</Table.Body>
            </Table>
        );
    }
}


export default FileList;
