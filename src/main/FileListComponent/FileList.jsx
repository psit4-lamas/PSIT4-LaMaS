import React, {Component} from 'react';
import fire from '../../firebase';
import {Table} from 'semantic-ui-react';
import {withNamespaces} from 'react-i18next';


class FileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            files: [],
            type: props.type,
        };
    }

    static colorForStructure(type) {
        if (type === 'V') {
            return 'teal';
        } else if (type === 'E') {
            return 'purple';
        } else if (type === 'L') {
            return 'blue';
        } else {
            return 'orange';
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
        const {t} = this.props;
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
            <Table color={ FileList.colorForStructure(this.state.type) } key={ FileList.colorForStructure(this.state.type) }>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{ t('fileList.' + this.state.type) }</Table.HeaderCell>
                        <Table.HeaderCell>{ t('fileList.action') }</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{ fileList }</Table.Body>
            </Table>
        );
    }
}


export default withNamespaces()(FileList);
