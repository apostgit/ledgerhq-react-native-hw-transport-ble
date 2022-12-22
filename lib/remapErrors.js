"use strict";
exports.__esModule = true;
exports.decoratePromiseErrors = exports.rethrowError = exports.remapError = void 0;
var errors_1 = require("@ledgerhq/errors");
var remapError = function (error) {
    if (!error || !error.message)
        return error;
    if (error.message.includes("was disconnected") ||
        error.message.includes("not found")) {
        return new errors_1.DisconnectedDevice();
    }
    return error;
};
exports.remapError = remapError;
var rethrowError = function (e) {
    throw (0, exports.remapError)(e);
};
exports.rethrowError = rethrowError;
var decoratePromiseErrors = function (promise) {
    return promise["catch"](exports.rethrowError);
};
exports.decoratePromiseErrors = decoratePromiseErrors;
//# sourceMappingURL=remapErrors.js.map