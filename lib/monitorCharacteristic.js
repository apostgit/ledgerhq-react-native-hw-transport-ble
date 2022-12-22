"use strict";
exports.__esModule = true;
exports.monitorCharacteristic = void 0;
var rxjs_1 = require("rxjs");
var errors_1 = require("@ledgerhq/errors");
var logs_1 = require("@ledgerhq/logs");
var monitorCharacteristic = function (characteristic) {
    return new rxjs_1.Observable(function (o) {
        (0, logs_1.log)("ble-verbose", "start monitor " + characteristic.uuid);
        var subscription = characteristic.monitor(function (error, c) {
            if (error) {
                (0, logs_1.log)("ble-verbose", "error monitor " + characteristic.uuid + ": " + error);
                o.error(error);
            }
            else if (!c) {
                o.error(new errors_1.TransportError("characteristic monitor null value", "CharacteristicMonitorNull"));
            }
            else {
                try {
                    var value = Buffer.from(c.value, "base64");
                    o.next(value);
                }
                catch (error) {
                    o.error(error);
                }
            }
        });
        return function () {
            (0, logs_1.log)("ble-verbose", "end monitor " + characteristic.uuid);
            subscription.remove();
        };
    });
};
exports.monitorCharacteristic = monitorCharacteristic;
//# sourceMappingURL=monitorCharacteristic.js.map