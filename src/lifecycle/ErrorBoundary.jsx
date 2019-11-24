import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('ErrorBoundary#componentDidCatch', error, info);
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const withErrorBoundary = WrappedComponent => props => (
  <ErrorBoundary>
    <WrappedComponent {...props} />
  </ErrorBoundary>
);

class SomethingWentWrong extends React.Component {
  state = { throwError: false };

  oops = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { throwError } = this.state;
    if (throwError) {
      throw 'oops...';
    } else {
      return <button onClick={this.oops}>Oops!</button>;
    }
  }
}

const ErrorBoundaryDemo = () => (
  <React.Fragment>
    <h2>Error Boundary Demo</h2>
    <ErrorBoundary>
      <SomethingWentWrong />
    </ErrorBoundary>
  </React.Fragment>
);

const HocErrorBoundaryDemo = () => {
  const SomethingWentWrongWithErrorBoundary = withErrorBoundary(
    SomethingWentWrong,
  );
  return (
    <React.Fragment>
      <h2>Error Boundary Demo (HOC)</h2>
      <ErrorBoundary>
        <SomethingWentWrongWithErrorBoundary />
      </ErrorBoundary>
    </React.Fragment>
  );
};

const ErrorBoundaryExamples = ({ match: { url, path } }) => {
  const activeStyle = {
    fontWeight: 'bolder',
  };
  return (
    <React.Fragment>
      <h1>Error Boundary Examples</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to={`${url}/ErrorBoundaryDemo`}
              activeStyle={activeStyle}
            >
              ErrorBoundaryDemo
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${url}/HocErrorBoundaryDemo`}
              activeStyle={activeStyle}
            >
              HocErrorBoundaryDemo
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route
          path={`${path}/ErrorBoundaryDemo`}
          component={ErrorBoundaryDemo}
        />
        <Route
          path={`${path}/HocErrorBoundaryDemo`}
          component={HocErrorBoundaryDemo}
        />
        <Redirect to={`${path}/ErrorBoundaryDemo`} />
      </Switch>
    </React.Fragment>
  );
};

export { withErrorBoundary, ErrorBoundaryExamples };

export default ErrorBoundary;
