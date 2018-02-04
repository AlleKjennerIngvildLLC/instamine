import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {routerMiddleware, routerReducer as routing, push} from 'react-router-redux';
import {reducer as notifications} from 'react-notification-system-redux';
import { reducer as formReducer } from 'redux-form';

import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

import miner from './reducers/miner';
import minerActions from './actions/miner';


export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    ...minerActions,
    push
  };

  const reducers = {
    miner,
    routing,
    notifications,
    form: formReducer
  };

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunk, router, sagaMiddleware];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({actionCreators});
    }
    return compose;
  })();
  

  var storageName = 'instamine-production-main-storage---0.0.3';
  if (process.env.NODE_ENV === 'development') {
    storageName = 'instamine-development-main-storage---0.0.3';
  }

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), 
  persistState(['miner']));
  const rootReducer = combineReducers(reducers);

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(minerActions.minerSaga);

  return store;
}
