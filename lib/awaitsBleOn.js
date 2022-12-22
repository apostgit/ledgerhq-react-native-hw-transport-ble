"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.awaitsBleOn = void 0;
var errors_1 = require("@ledgerhq/errors");
var logs_1 = require("@ledgerhq/logs");
var timer_1 = __importDefault(require("./timer"));
var awaitsBleOn = function (bleManager, ms) {
    if (ms === void 0) { ms = 3000; }
    return new Promise(function (resolve, reject) {
        var done = false;
        var lastState = "Unknown";
        var stateSub = bleManager.onStateChange(function (state) {
            lastState = state;
            (0, logs_1.log)("ble-verbose", "ble state -> ".concat(state));
            if (state === "PoweredOn") {
                if (done)
                    return;
                removeTimeout();
                done = true;
                stateSub.remove();
                resolve();
            }
        }, true);
        var removeTimeout = timer_1["default"].timeout(function () {
            if (done)
                return;
            stateSub.remove();
            reject(new errors_1.BluetoothRequired("", {
                state: lastState
            }));
        }, ms);
    });
};
exports.awaitsBleOn = awaitsBleOn;
//# sourceMappingURL=awaitsBleOn.js.map