'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = configureStore;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reactNotificationSystemRedux = require('react-notification-system-redux');

var _reduxForm = require('redux-form');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reduxLocalstorage = require('redux-localstorage');

var _reduxLocalstorage2 = _interopRequireDefault(_reduxLocalstorage);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _miner = require('./reducers/miner');

var _miner2 = _interopRequireDefault(_miner);

var _miner3 = require('./actions/miner');

var _miner4 = _interopRequireDefault(_miner3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState, routerHistory) {
  var router = (0, _reactRouterRedux.routerMiddleware)(routerHistory);

  var actionCreators = (0, _extends3.default)({}, _miner4.default, {
    push: _reactRouterRedux.push
  });

  var reducers = {
    miner: _miner2.default,
    routing: _reactRouterRedux.routerReducer,
    notifications: _reactNotificationSystemRedux.reducer,
    form: _reduxForm.reducer
  };

  var sagaMiddleware = (0, _reduxSaga2.default)();

  var middlewares = [_reduxThunk2.default, router, sagaMiddleware];

  var composeEnhancers = function () {
    var compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators: actionCreators });
    }
    return _redux.compose;
  }();

  var storageName = 'instamine-production-main-storage---';
  if (process.env.NODE_ENV === 'development') {
    storageName = 'instamine-development-main-storage---';
  }

  var enhancer = composeEnhancers(_redux.applyMiddleware.apply(undefined, middlewares), (0, _reduxLocalstorage2.default)());
  var rootReducer = (0, _redux.combineReducers)(reducers);

  var store = (0, _redux.createStore)(rootReducer, initialState, enhancer);
  sagaMiddleware.run(_miner4.default.minerSaga);

  return store;
}