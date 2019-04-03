import React from 'react';
import { connect } from 'react-redux';

const withAuthorization = (condition) => (Component) => {
    class WithAuthorization extends React.Component {
        render() {
            return condition(this.props.user) ? <Component {...this.props} /> : null;
        }
    }

    return connect(mapStateToProps)(WithAuthorization);
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default withAuthorization;
