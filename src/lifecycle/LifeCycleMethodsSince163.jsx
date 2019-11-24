import React from 'react';
import PropTypes from 'prop-types';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    console.log('Parent#constructor');

    const innerWidth = window.innerWidth;

    this.state = {
      name: 'Joe',
      age: 28,
      address: '1 Moon Street, Moon',
      showChild: true,
      innerWidth,
    };
  }

  render() {
    console.log('Parent#render');
    const { name, age, address, innerWidth, showChild } = this.state;
    return (
      <div>
        <h1>React - Life Cycle Methods Since v16.3</h1>
        <div>This is Parent - {name}.</div>
        <div>Age: {age}</div>
        <div>Address: {address}</div>
        <div>Window width: {innerWidth}</div>
        {showChild && <Child parentName={name} parentAge={age} />}
        <button onClick={this.changeAge}>Parent Age ++</button>
        <button onClick={this.changeAddress}>Change Address</button>
        <button onClick={this.toggleChild}>Toggle Child</button>
      </div>
    );
  }

  componentDidMount() {
    console.log('Parent#componentDidMount');
  }

  changeAge = () => {
    this.setState({ age: this.state.age + 1 });
  };

  changeAddress = () => {
    this.setState({ address: '2 Mars St, Mars' });
  };

  toggleChild = () => {
    this.setState({ showChild: !this.state.showChild });
  };

  /**
   * The new function which main responsibility is ensuring that the state and props are in sync for when it is required.
   * It’s main job is replacing componentWillReceiveProps
   * This is a static function and as such has no access to this — you are instead expected to return an object, which will be merged into the future state of the component (exactly like working with setState!)
   * The function is used when a component is updated but also when it is mounted, right after the constructor was called, so you no longer need to use constructor or class property form of state if you want to set initial state from props.
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Parent#static-getDerivedStateFromProps', {
      nextProps,
      prevState,
    });
    return {};
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const result = true;
    console.log('Parent#shouldComponentUpdate', {
      nextProps,
      nextState,
      nextContext,
      result,
    });
    return true;
  }

  /**
   * Invoked in the so called “pre-commit phase”, right before the changes from VDOM are to be reflected in the DOM.
   * Even though the function is not static, it is recommended to return the value, not update the component.
   * The returned value will be passed to componentDidUpdate as the 3rd parameter.
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Parent#getSnapshotBeforeUpdate', {
      prevProps,
      prevState,
    });
    return { fromParentGetSnapshotBeforeUpdate: "G'day!" };
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    console.log('Parent#componentDidUpdate', {
      prevProps,
      prevState,
      prevContext,
    });
  }

  componentWillUnmount() {
    console.log('Parent#componentWillUnmount');
  }

  componentDidCatch(errorString, errorInfo) {
    console.log('Parent#componentDidCatch', errorString, errorInfo);
  }
}

class Child extends React.Component {
  state = {
    name: 'child',
  };

  constructor(props) {
    super(props);
    console.log('Child#constructor');
  }

  render() {
    console.log('Child#render');
    return (
      <div>
        <div>This is Child of {this.props.parentName}</div>
        <div>Parent age: {this.props.parentAge}</div>
      </div>
    );
  }

  componentDidMount() {
    console.log('Child#componentDidMount');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Child#static-getDerivedStateFromProps', {
      nextProps,
      prevState,
    });
    return {};
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const result = this.props.parentAge % 2 === 0;
    console.log('Child#shouldComponentUpdate', {
      nextProps,
      nextState,
      nextContext,
      result,
    });
    return result;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Child#getSnapshotBeforeUpdate', {
      prevProps,
      prevState,
    });
    return { fromChildGetSnapshotBeforeUpdate: "G'day!" };
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    console.log('Child#componentDidUpdate', {
      prevProps,
      prevState,
      prevContext,
    });
  }

  componentWillUnmount() {
    console.log('Child#componentWillUnmount');
  }
}

export default () => (
  <Parent>
    <Child />
  </Parent>
);
