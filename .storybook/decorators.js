import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store/new-order-store';

const withAppWrapper = (Story) => (
  <div className="App">
    <Story />
  </div>
);

const withProvider = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

export {
  withAppWrapper,
  withProvider,
}