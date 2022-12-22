import { BluetoothRequired } from "@ledgerhq/errors";
import { log } from "@ledgerhq/logs";
import timer from "./timer";
export var awaitsBleOn = function (bleManager, ms) {
    if (ms === void 0) { ms = 3000; }
    return new Promise(function (resolve, reject) {
        var done = false;
        var lastState = "Unknown";
        var stateSub = bleManager.onStateChange(function (state) {
            lastState = state;
            log("ble-verbose", "ble state -> ".concat(state));
            if (state === "PoweredOn") {
                if (done)
                    return;
                removeTimeout();
                done = true;
                stateSub.remove();
                resolve();
            }
        }, true);
        var removeTimeout = timer.timeout(function () {
            if (done)
                return;
            stateSub.remove();
            reject(new BluetoothRequired("", {
                state: lastState
            }));
        }, ms);
    });
};
//# sourceMappingURL=awaitsBleOn.js.map