import React from 'react';

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
  return   <React.Fragment>
    <h2>Error Boundary Demo (HOC)</h2>
    <ErrorBoundary>
      <SomethingWentWrongWithErrorBoundary />
    </ErrorBoundary>
  </React.Fragment>;
};

const ErrorBoundaryExamples = () => {
  return (
    <React.Fragment>
      <h1>Error Boundary Examples</h1>
      <ErrorBoundaryDemo />
      <HocErrorBoundaryDemo />
    </React.Fragment>
  );
};

export { withErrorBoundary, ErrorBoundaryExamples };

export default ErrorBoundary;
