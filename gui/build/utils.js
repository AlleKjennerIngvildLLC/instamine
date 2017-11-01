"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function timestamp_to_date(event) {
    var timestamp = event.getTimestamp();
    var date = new Date(timestamp.getSeconds() * 1000 + timestamp.getNanos() / 1000);

    return date;
}

exports.default = timestamp_to_date;
//# sourceMappingURL=utils.js.map