import { Observable } from "rxjs";
import { TransportError } from "@ledgerhq/errors";
import { log } from "@ledgerhq/logs";
export var monitorCharacteristic = function (characteristic) {
    return new Observable(function (o) {
        log("ble-verbose", "start monitor " + characteristic.uuid);
        var subscription = characteristic.monitor(function (error, c) {
            if (error) {
                log("ble-verbose", "error monitor " + characteristic.uuid + ": " + error);
                o.error(error);
            }
            else if (!c) {
                o.error(new TransportError("characteristic monitor null value", "CharacteristicMonitorNull"));
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
            log("ble-verbose", "end monitor " + characteristic.uuid);
            subscription.remove();
        };
    });
};
//# sourceMappingURL=monitorCharacteristic.js.map