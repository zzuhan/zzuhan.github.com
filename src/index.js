import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';

import DefaultContainer from '@/containers/Default';
const ENTRY_POINT = document.querySelector('#react-app-root');

import vara from './config';

const render = () => {
  ReactDOM.render(<DefaultContainer />, ENTRY_POINT);
  // <AppContainer store={store} history={history} />, ENTRY_POINT);
};

// this will help us understand where the problem is located once app will fall.
const renderError = error => {
  ReactDOM.render(<RedBox error={error} />, ENTRY_POINT);
};

// register serviceWorkers if available
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceWorker.js')
    .then(registration => {
      console.log('Excellent, registered with scope: ', registration.scope);
    })
    .catch(e => console.error('ERROR IN SERVICE WORKERS: ', e));
}

// This code is excluded from production bundle
if (__DEV__) {
  // ========================================================
  // DEVELOPMENT STAGE! HOT MODULE REPLACE ACTIVATION!
  // ========================================================
  const devRender = () => {
    if (module.hot) {
      module.hot.accept('./containers/Default', () => render());
    }

    render();
  };

  // Wrap render in try/catch
  try {
    devRender();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
} else {
  // ========================================================
  // PRODUCTION GO!
  // ========================================================
  render();
}
