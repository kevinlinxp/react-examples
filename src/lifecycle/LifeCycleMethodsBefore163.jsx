import React from 'react';
import PropTypes from 'prop-types';

class Parent extends React.Component {
  /************************************/
  /********** Mounting Phase **********/
  /************************************/

  // One of the two places where the state can be initialised and directly-assigned. Another place is in the constructor.
  // class properties syntax
  state = {
    name: 'first',
  };

  /**
   * Called once.
   *
   * DO:
   * - set initial state
   * - if not using class properties syntax — prepare all class fields and bind functions that will be passed as callbacks
   *
   * DON'T:
   * - cause any side effects (AJAX calls etc.)
   */
  constructor(props) {
    super(props);
    console.log('Parent#constructor');

    // One of the two places where the state can be initialised and directly-assigned. In other places, we have to use
    // this.setState() to update the state.
    this.state = {
      name: 'Joe',
      age: 20,
      address: '1 Moon Street, Moon',
      showChild: true,
    };
  }

  /**
   * Deprecated, will be removed from v17
   *
   * Alternative: custructor (e.g. to initialise state, subscribe global objects), componentDidMount (e.g. general subscription).
   *
   * This method is called right before the first render, so it's a good opportunity to update the state without re-render.
   * This function might end up being called multiple times before the initial render is called so might result in triggering multiple side-effects. Due to this fact it is not recommended to use this function for any side-effect causing operations.
   *
   * DO:
   * - update state via this.setState
   * - perform last minute optimization
   * - subscribe
   * - (server-side-rendering only) cause side-effects (AJAX calls etc.)
   *
   * DON'T:
   * - cause any side effects (AJAX calls etc.) on client side
   */
  componentWillMount() {
    console.log('Parent#componentWillMount');

    const innerWidth = window.innerWidth;
    this.setState({ innerWidth });
  }

  // DON'T call this.setState() in render.
  render() {
    console.log('Parent#render');
    const { name, age, address, innerWidth, showChild } = this.state;
    return (
      <div>
        <h1>React - Life Cycle Methods Before v16.3</h1>
        <div>This is Parent - {name}.</div>
        <div>Age: {age}</div>
        <div>Address: {address}</div>
        <div>Window width: {innerWidth}</div>
        {showChild && <Child parentName={name} parentAge={age} />}
        <button onClick={this.growAge}>Parent Ageing ++</button>
        <button onClick={this.changeAddress}>Change Address</button>
        <button onClick={this.toggleChild}>Toggle Child</button>
      </div>
    );
  }

  /**
   * Guaranteed to be called only once in the whole life cycle of a given component
   * it being called signalizes that the component — and all its sub-components — rendered properly.
   *
   * DO
   * - cause side effects (AJAX calls etc.)
   *
   * DON’T
   * - call this.setState as it will result in a re-render
   */
  componentDidMount() {
    console.log('Parent#componentDidMount');
  }

  /************************************/
  /********** Updating Phase **********/
  /************************************/

  // class properties syntax
  growAge = () => {
    this.setState({ age: this.state.age + 1 });
  };

  // class properties syntax
  changeAddress = () => {
    this.setState({ address: '2 Mars St, Mars' });
  };

  // class properties syntax
  toggleChild = () => {
    this.setState({ showChild: !this.state.showChild });
  };

  /**
   * Deprecated, will be removed from v17
   *
   * Alternative: getDerivedStateFromProps()
   *
   * This function will be called in each update life cycle caused by changes to props (parent component re-rendering) and will be passed an object map of all the props passed, no matter if the prop value has changed or not since previous re-render phase.   *
   * This function might be called multiple times before the render function is actually called. It is not recommended to use any side-effect causing operations here.
   *
   * DO:
   * - sync state to props
   *
   * DON'T:
   * - cause any side effects (AJAX calls etc.)
   */
  componentWillReceiveProps(nextProps) {
    console.log('Parent#componentWillReceiveProps', { nextProps });
  }

  /**
   * DO:
   * - use for increasing performance of poor performing Components
   *
   * DON'T:
   * - cause any side effects (AJAX calls etc.)
   * - call this.setState
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const result = true;
    console.log('Parent#shouldComponentUpdate', {
      nextProps,
      nextState,
      nextContext,
      result,
    });
    return result;
  }

  /**
   * Deprecated, will be removed from v17
   *
   * In cases where shouldComponentUpdate is implemented, this function can be used instead of componentWillReceiveProps as it will be called only when the component will actually be re-rendered.
   * Similarly to all other componentWill* functions, this function might end up called multiple times before render so it it not advised to perform side-effects causing operations here.
   *
   * DO:
   * - sync state to props
   *
   * DON'T:
   * - cause any side effects (AJAX calls etc.)
   */
  componentWillUpdate(nextProps, nextState) {
    console.log('Parent#componentWillUpdate', {
      nextProps,
      nextState,
    });
  }

  /**
   * Guaranteed to be called, and will be called only once after render is finished in each of the re-render cycles.
   * It can be sure that the component and all its sub-components have properly rendered itself.
   *
   * DO:
   * - cause side effects (AJAX calls etc.)
   *
   * DON'T:
   * - call this.setState as it will result in a re-render
   * - An exception to the above rule is updating the state based on some DOM property which can be only computed once a component has re-rendered (e.g. position / dimensions of some DOM nodes). Please take extra care to prevent against updating if the value did not in fact change as it might result in a render loop.
   */
  componentDidUpdate(prevProps, prevState, prevContext) {
    console.log('Parent#componentDidUpdate', {
      prevProps,
      prevState,
      prevContext,
    });
  }

  /*************************************/
  /********** Unmouting Phase **********/
  /*************************************/

  /**
   * Use this function to “clean up” after the component if it takes advantage of timers (setTimeout, setInterval), opens sockets or performs any operations we need to close / remove when no longer needed.
   *
   * DO:
   * - remove any timers or listeners created in lifespan of the component
   *
   * DON'T:
   * - call this.setState, start new listeners or timers
   */
  componentWillUnmount() {
    console.log('Parent#componentWillUnmount');
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

  componentWillMount() {
    console.log('Child#componentWillMount');
  }

  render() {
    console.log('Child#render');
    return (
      <div>
        <div>This is Child of {this.props.parentName}</div>
        <div>Parent cound: {this.props.parentAge}</div>
      </div>
    );
  }

  componentDidMount() {
    console.log('Child#componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('Child#componentWillReceiveProps', { nextProps });
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

  componentWillUpdate(nextProps, nextState) {
    console.log('Child#componentWillUpdate', {
      nextProps,
      nextState,
    });
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
