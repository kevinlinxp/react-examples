import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import LifecycleExamples from './lifecycle/index';

const App = () => (
  <Router>
    <LifecycleExamples />
  </Router>
);
  
export default App;
