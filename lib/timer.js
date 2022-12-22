"use strict";
exports.__esModule = true;
var timer = process.env.NODE_ENV === "development"
    ? {
        timeout: function (fn, ms) {
            // hack for a bug in RN https://github.com/facebook/react-native/issues/9030
            var startTime = Date.now();
            var interval = setInterval(function () {
                if (Date.now() - startTime >= ms) {
                    clearInterval(interval);
                    fn();
                }
            }, 100);
            return function () {
                clearInterval(interval);
            };
        }
    }
    : {
        timeout: function (fn, ms) {
            var timeout = setTimeout(fn, ms);
            return function () { return clearTimeout(timeout); };
        }
    };
exports["default"] = timer;
//# sourceMappingURL=timer.js.map