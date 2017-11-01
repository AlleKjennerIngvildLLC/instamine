'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventTable = function (_Component) {
    (0, _inherits3.default)(EventTable, _Component);

    function EventTable(props) {
        (0, _classCallCheck3.default)(this, EventTable);
        return (0, _possibleConstructorReturn3.default)(this, (EventTable.__proto__ || (0, _getPrototypeOf2.default)(EventTable)).call(this, props));
    }

    (0, _createClass3.default)(EventTable, [{
        key: 'render',
        value: function render() {
            function transform(i, event) {
                var types = ["connection", "reply", "error", "end", "empty", "result", "job"];

                var eventType;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(types), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var type = _step.value;

                        if (event[type] !== undefined) {
                            eventType = type.toUpperCase();
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                var date = new Date(event.timestamp.seconds * 1000 + event.timestamp.nanos / 1000);

                return { id: i, type: type, date: date };
            }

            var events = this.props.events.map(function (i, event) {
                return transform(event, i);
            });

            var columns = [{
                Header: 'Event type',
                accessor: 'type'

                // maxWidth: 200,
            }, {
                Header: 'Date',
                id: 'date',
                accessor: function accessor(d) {
                    return d.date.toString();
                }

                // maxWidth: 200,
            }];

            return _react2.default.createElement(_reactTable2.default, {
                style: {
                    color: 'black',
                    background: 'white'

                },
                defaultPageSize: 9,
                showPageSizeOptions: false,
                showPageJump: false,
                sortable: true,
                resizable: true,
                filterable: false,
                className: '-striped -highlight',
                data: events,
                columns: columns
            });
        }
    }]);
    return EventTable;
}(_react.Component);

exports.default = EventTable;
;
//# sourceMappingURL=EventTable.js.map