import React from 'react';

import { Switch, Route, Link, NavLink } from 'react-router-dom';

import LifeCycleMethodsBefore163 from './LifeCycleMethodsBefore163';
import LifeCycleMethodsSince163 from './LifeCycleMethodsSince163';

import { ErrorBoundaryExamples } from './ErrorBoundary';

const activeStyle = {
  fontWeight: 'bolder',
};

const LifecycleExamples = () => (
  <React.Fragment>
    <nav>
      <ul>
        <li>
          <NavLink
            to="/LifeCycleMethodsBefore163"
            activeStyle={activeStyle}
          >
            LifeCycleMethodsBefore163
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/LifeCycleMethodsSince163"
            activeStyle={activeStyle}
          >
            LifeCycleMethodsSince163
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ErrorBoundaryExamples"
            activeStyle={activeStyle}
          >
            ErrorBoundaryExamples
          </NavLink>
        </li>
        <li>
          <Link to="/">Unmount</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route exact path="/LifeCycleMethodsBefore163">
        <LifeCycleMethodsBefore163 />
      </Route>
      <Route exact path="/LifeCycleMethodsSince163">
        <LifeCycleMethodsSince163 />
      </Route>
      <Route
        path="/ErrorBoundaryExamples"
        component={ErrorBoundaryExamples}
      />
    </Switch>
  </React.Fragment>
);

export default LifecycleExamples;
