import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const withNameSpacesAndRouterAndRedux = (mapStateToProps, mapDispatchToProps, WrappedComponent) =>
    withNamespaces()(withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)));

const withNameSpacesAndRedux = (mapStateToProps, mapDispatchToProps, WrappedComponent) =>
    withNamespaces()(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));

const withRouterAndRedux = (mapStateToProps, mapDispatchToProps, WrappedComponent) =>
    withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));

const isEmptyObject = (object) => {
    return !object || Object.keys(object).length === 0;
};

export { withNameSpacesAndRouterAndRedux, withNameSpacesAndRedux, withRouterAndRedux, isEmptyObject };
