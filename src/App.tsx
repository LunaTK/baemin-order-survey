import React, { lazy, Suspense } from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from 'react-redux';
import newOrderStore from './store/new-order-store';

const Event = lazy(() => import('./pages/Event'));
const EventSummary = lazy(() => import('./pages/EventSummary'));
const EventList = lazy(() => import('./pages/EventList'));

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Suspense fallback={null}>
          <Provider store={newOrderStore}>
            <Switch>
              <Route exact path="/event/:eventId/summary" component={EventSummary} />
              <Route exact path="/eventlist" component={EventList} />
              <Route exact path="/event/:eventId" component={Event} />
              <Redirect to="/eventlist"/>
            </Switch>
          </Provider>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
