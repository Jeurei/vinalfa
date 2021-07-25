// CUR COMPONENT
import './index.scss';
import React from 'react';
import rootReducer from 'state';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { homeRoute, modificationRoute, modificationsRoute, search } from 'routes';

// PAGES
import ANY from 'pages/ANY';
import FOUND from 'pages/FOUND';
import CATALOG from 'pages/CATALOG';
import SECTION_CAR from 'pages/SECTION_CAR';
import SEARCH_CAR from 'pages/SEARCH_CAR';

// COMPONENTS
import Card from 'components/Card';
import Search from 'components/Search';
import Footer from 'components/Footer';
import ColorScheme from 'components/ColorScheme';
import HistoryActions from 'components/HistoryActions';
import Bughunter from 'components/Bughunter';

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ColorScheme />

        <div className='colorScheme_b32'>
          <div className='module'>
            <HistoryActions />
            <div className='search'>
              <Card>
                <Search />
                <Footer />
              </Card>
            </div>

            <Switch>
              <Route exact path={homeRoute.path}>
                {/* <Bughunter></Bughunter>             */}
                <CATALOG />
              </Route>

              <Route exact path={modificationsRoute.path}>
                {/* <Bughunter></Bughunter>             */}
                <FOUND />
              </Route>

              <Route path={search.path}>
                {/* <Bughunter></Bughunter>             */}
                <SEARCH_CAR />
              </Route>

              <Route path={modificationRoute.path}>
                {/* <Bughunter></Bughunter>             */}
                <SECTION_CAR />
              </Route>

              <Route path='*'>
                {/* <Bughunter></Bughunter>           */}
                <ANY />
              </Route>
            </Switch>
          </div>
        </div>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('module')
);
