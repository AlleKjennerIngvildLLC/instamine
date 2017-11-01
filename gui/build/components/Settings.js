'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rebass = require('rebass');

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Settings = function (_Component) {
  (0, _inherits3.default)(Settings, _Component);

  function Settings() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Settings);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Settings.__proto__ || (0, _getPrototypeOf2.default)(Settings)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      walletAddress: '',
      nThreads: 1,
      enableGPU: false
    }, _this.handleSubmit = function (event) {

      var cpu_threads_conf = _this.buildCpuConfig(_this.state.nThreads);
      var config = (0, _config2.default)(cpu_threads_conf, _this.state.walletAddress);

      _this.setState({ config: config }, function () {
        _this.props.updateSettings(_this.state);
      });

      event.preventDefault();
    }, _this.buildCpuConfig = function (n) {
      var cpuSettings = _lodash2.default.range(n).map(function (i) {
        return {
          'low_power_mode': false,
          'no_prefetch': true,
          'affine_to_cpu': i
        };
      });

      return cpuSettings;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Settings, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState(this.props.settings);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var nCpus = _os2.default.cpus().length;

      var state = this.state;


      return _react2.default.createElement(
        'div',
        { className: 'pane-group' },
        _react2.default.createElement(
          _rebass.Flex,
          {
            is: 'div',
            className: 'pane',
            wrap: true,
            column: true,
            align: 'center',
            justify: 'center',
            style: {
              backgroundSize: 'cover',
              backgroundImage: 'url("http://repositrak.com/wp-content/uploads/2015/09/RT-APPLICATION-BACKGROUND-01-04-1184x662.png")'
            } },
          _react2.default.createElement(
            _rebass.Flex,
            null,
            _react2.default.createElement(
              _rebass.Heading,
              { fontSize: 24, style: { color: 'white' } },
              'Monero (XMR) Settings '
            )
          ),
          _react2.default.createElement(
            _rebass.Flex,
            null,
            _react2.default.createElement(
              _rebass.Box,
              { width: '400px' },
              _react2.default.createElement(
                'div',
                {
                  style: {
                    background: '#f5f5f4',
                    padding: '15px 15px 15px 15px',
                    border: '1px solid #c2c0c2'
                  } },
                _react2.default.createElement(
                  'form',
                  { onSubmit: this.handleSubmit },
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'div',
                      { className: 'col-xs-12' },
                      _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                          'label',
                          null,
                          'Wallet address'
                        ),
                        _react2.default.createElement(_rebass.Input, {
                          style: {
                            background: 'white',
                            border: '1px solid #c2c0c2'
                          },
                          onChange: function onChange(event) {
                            return _this2.setState({ walletAddress: event.target.value });
                          },
                          value: state.walletAddress,
                          type: 'text',
                          className: 'form-control',
                          placeholder: '' })
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'div',
                      { className: 'col-xs-12' },
                      _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                          'label',
                          null,
                          'Threads'
                        ),
                        _react2.default.createElement(_rebass.Input, {
                          style: {
                            background: 'white',
                            border: '1px solid #c2c0c2'
                          },
                          onChange: function onChange(event) {
                            var cpus = event.target.value;
                            cpus = _lodash2.default.min([nCpus, cpus]);
                            _this2.setState({ nThreads: cpus });
                          },
                          value: state.nThreads,
                          type: 'number',
                          min: '1',
                          max: '' + nCpus,
                          className: 'form-control',
                          placeholder: '' })
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'checkbox' },
                    _react2.default.createElement(
                      _rebass.Tooltip,
                      { text: 'Not yet supported.' },
                      _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('input', { disabled: true, type: 'checkbox' }),
                        ' Enable GPU'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-actions' },
                    _react2.default.createElement(
                      'button',
                      { type: 'submit', className: 'btn btn-form btn-primary' },
                      'Save'
                    )
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            _rebass.Flex,
            null,
            _react2.default.createElement(
              _rebass.Box,
              null,
              _react2.default.createElement(_rebass.Image, {

                style: {
                  marginTop: "-50px",
                  height: '200px'
                },
                src: './banner.png'
              })
            )
          )
        )
      );
    }
  }]);
  return Settings;
}(_react.Component);

exports.default = Settings;
//# sourceMappingURL=Settings.js.map