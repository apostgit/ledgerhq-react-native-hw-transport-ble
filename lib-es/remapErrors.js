import { DisconnectedDevice } from "@ledgerhq/errors";
export var remapError = function (error) {
    if (!error || !error.message)
        return error;
    if (error.message.includes("was disconnected") ||
        error.message.includes("not found")) {
        return new DisconnectedDevice();
    }
    return error;
};
export var rethrowError = function (e) {
    throw remapError(e);
};
export var decoratePromiseErrors = function (promise) {
    return promise["catch"](rethrowError);
};
//# sourceMappingURL=remapErrors.js.map