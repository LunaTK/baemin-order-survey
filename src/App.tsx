import React, { lazy, Suspense } from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import newOrderStore from './store/new-order-store';
import NotFound from './pages/NotFound';

const Event = lazy(() => import('./pages/Event'));
const EventSummary = lazy(() => import('./pages/EventSummary'));
const EventList = lazy(() => import('./pages/EventList'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={null}>
          <Switch>
            <Route exact path="/event/:eventId/summary" component={EventSummary} />
            <Route exact path="/eventlist" component={EventList} />
            <Provider store={newOrderStore}>
              <Route exact path="/event/:eventId" component={Event} />
            </Provider>
            <Route component={NotFound}/>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
