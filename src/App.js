import React from 'react';

import './App.css';
import Home from './container/Home/Home';
import { Route } from 'react-router-dom';
import Products from './container/Products/Products';
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route path="/products" component={Products} />
    </div>
  );
}

export default App;
