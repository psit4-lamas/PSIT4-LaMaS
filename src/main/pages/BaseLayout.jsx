import React, { Component } from 'react';
import { withNameSpacesAndRouterAndRedux } from '../../utils';
import i18n from '../../i18n';
import { Grid, Menu } from 'semantic-ui-react';
import TopMenuUnauthenticated from '../ComponentMenu/TopMenuUnauthenticated';
import TopMenu from '../ComponentMenu/TopMenu';
import { selectLecture } from '../actions';
import './BaseLayout.css';


class BaseLayout extends Component {
    changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    handleItemClick = (e) => this.props.selectLecture(e.target.id);

    // TODO: improve base page UI (Sprint 2)
    render() {
        const { t, user, lectures } = this.props;
        const { pathname } = window.location;
        const excludedPages = ['/', '/home', '/upload', '/createsubject'];

        return (
            <React.Fragment>
                <header>
                    {/* TODO: fix this TopMenu */ }
                    { user.isLoadingUser || !user.isAuthenticated ? (
                        <TopMenuUnauthenticated t={ t } changeLanguage={ this.changeLanguage }/>
                    ) : (
                          <TopMenu t={ t } changeLanguage={ this.changeLanguage }/>
                      ) }
                </header>

                {/* TODO: fix matching TopMenu clicked items with Route content shown (below) */ }
                <main id="page-content">
                    <Grid columns={ 3 }>
                        <Grid.Column width={ 3 }>
                            {/* TODO: add left aside menu (listing lectures of a specific subject) */ }
                            { user.isLoadingUser || !user.isAuthenticated || excludedPages.includes(pathname)
                              ? ('')
                              : (
                                  <>
                                      <Menu fluid vertical tabular>
                                          { Object.keys(lectures).map((index, key) => (
                                              <Menu.Item
                                                  name={ t('baseLayout.lecture') + ( key + 1 ) }
                                                  id={ index }
                                                  active={ this.props.currentLectureID === index }
                                                  onClick={ this.handleItemClick }
                                              />
                                          )) }
                                      </Menu>
                                  </>
                              ) }
                        </Grid.Column>
                        <Grid.Column width={ 10 }>{ this.props.children }</Grid.Column>
                    </Grid>
                </main>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ( {
    lectures: state.subject.currentSubject.lectures,
    currentLectureID: state.subject.currentLectureID,
} );

const mapDispatchToProps = {
    selectLecture,
};

export { BaseLayout };
export default withNameSpacesAndRouterAndRedux(mapStateToProps, mapDispatchToProps, BaseLayout);
