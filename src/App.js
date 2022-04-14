import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import './App.css';
import Home from './container/Home/Home';
import Login from './container/Auth/Login';
import Register from './container/Auth/Register';
import { Switch, Route } from 'react-router-dom';
import Products from './container/Products/Products';
import { SimpleDialog } from './container/CartModal/CartModal';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SimpleDialog />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
