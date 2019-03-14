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

        this.unsubscribe = fire.database().collection('videos')
            .onSnapshot(snapshot => {
                let files = [];

                snapshot.forEach(doc =>
                    files.push({...doc.data(), uid: doc.id}),
                );

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
        var namesList = this.state.files.map(function (name) {
            return <li>{ name.filename } for lecture { name.lecture }</li>;
        })
        return (
            <ul>
                { namesList }
            </ul> );
    }
}


export default FileList;