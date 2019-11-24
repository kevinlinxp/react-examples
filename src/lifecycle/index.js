import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';

import LifeCycleMethodsBefore163 from './LifeCycleMethodsBefore163';
import LifeCycleMethodsSince163 from './LifeCycleMethodsSince163';

import { ErrorBoundaryExamples } from './ErrorBoundary';

const LifecycleExamples = () => (
  <React.Fragment>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/LifeCycleMethodsBefore163">LifeCycleMethodsBefore163</Link>
          </li>
          <li>
            <Link to="/LifeCycleMethodsSince163">LifeCycleMethodsSince163</Link>
          </li>
          <li>
            <Link to="/ErrorBoundaryExamples">ErrorBoundaryExamples</Link>
          </li>
          <li>
            <Link to="/">Unmount</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/LifeCycleMethodsBefore163">
          <LifeCycleMethodsBefore163 />
        </Route>
        <Route path="/LifeCycleMethodsSince163">
          <LifeCycleMethodsSince163 />
        </Route>
        <Route path="/ErrorBoundaryExamples">
          <ErrorBoundaryExamples />
        </Route>
      </Switch>
    </div>
  </React.Fragment>
);

export default LifecycleExamples;
