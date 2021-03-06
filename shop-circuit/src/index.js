import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App  style={{overflow:'hidden'}}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


