import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const withNameSpacesAndRouterAndRedux = (mapStateToProps, mapDispatchToProps, WrappedComponent) =>
    withNamespaces()(withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)));

const withRouterAndRedux = (mapStateToProps, mapDispatchToProps, WrappedComponent) =>
    withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));

export { withNameSpacesAndRouterAndRedux, withRouterAndRedux };
