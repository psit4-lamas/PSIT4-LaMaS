import React, {Component} from 'react';
import fire from '../../firebase';


class FileList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            files: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});

        this.unsubscribe = fire
            .database()
            .collection('files')
            .where('subject', '==', 'KI')
            .onSnapshot((snapshot) => {
                let files = [];

                snapshot.forEach((doc) => files.push({...doc.data(), uid: doc.id}));

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
        var fileList = this.state.files.map(function (dbEntry) {
            return (
                <li>
                    <a
                        href={ fire
                            .storage()
                            .ref(dbEntry.nameOnStorage)
                            .getDownloadURL() }
                    >
                        { dbEntry.nameOnStorage } for subject { dbEntry.subject } and lecture { dbEntry.lecture }
                    </a>
                </li>
            );
        });
        return <ul>{ fileList }</ul>;
    }
}


export default FileList;
