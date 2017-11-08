import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {routerMiddleware, routerReducer as routing, push} from 'react-router-redux';
import {reducer as notifications} from 'react-notification-system-redux';

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
    notifications
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
  

  var storageName = 'instamine-production-main-storage---';
  if (process.env.NODE_ENV === 'development') {
    storageName = 'instamine-development-main-storage---';
  }

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), 
  persistState());
  const rootReducer = combineReducers(reducers);

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(minerActions.minerSaga);

  return store;
}
