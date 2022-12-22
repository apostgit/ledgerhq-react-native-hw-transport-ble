/// <reference types="node" />
import Transport from "@ledgerhq/hw-transport";
import type { Subscription as TransportSubscription, Observer as TransportObserver, DescriptorEvent } from "@ledgerhq/hw-transport";
import type { DeviceModel } from "@ledgerhq/devices";
import { Observable } from "rxjs";
import type { Device, Characteristic } from "./types";
declare type ReconnectionConfig = {
    pairingThreshold: number;
    delayAfterFirstPairing: number;
};
export declare function setReconnectionConfig(config: ReconnectionConfig | null | undefined): void;
/**
 * react-native bluetooth BLE implementation
 * @example
 * import BluetoothTransport from "@ledgerhq/react-native-hw-transport-ble";
 */
export default class BluetoothTransport extends Transport {
    /**
     *
     */
    static isSupported: () => Promise<boolean>;
    /**
     *
     */
    static setLogLevel: (level: any) => void;
    /**
     * TODO could add this concept in all transports
     * observe event with { available: bool, string } // available is generic, type is specific
     * an event is emit once and then listened
     */
    static observeState(observer: any): {
        unsubscribe: () => void;
    };
    static list: () => any;
    /**
     * Scan for bluetooth Ledger devices
     */
    static listen(observer: TransportObserver<DescriptorEvent<Device>>): TransportSubscription;
    /**
     * Open a BLE transport
     * @param {*} deviceOrId
     */
    static open(deviceOrId: Device | string): Promise<any>;
    /**
     * Globally disconnect a BLE device by its ID
     */
    static disconnect: (id: any) => Promise<void>;
    id: string;
    device: Device;
    mtuSize: number;
    writeCharacteristic: Characteristic;
    writeCmdCharacteristic: Characteristic;
    notifyObservable: Observable<any>;
    deviceModel: DeviceModel;
    notYetDisconnected: boolean;
    constructor(device: Device, writeCharacteristic: Characteristic, writeCmdCharacteristic: Characteristic, notifyObservable: Observable<any>, deviceModel: DeviceModel);
    /**
     * communicate with a BLE transport
     */
    exchange: (apdu: Buffer) => Promise<any>;
    inferMTU(): Promise<number>;
    requestConnectionPriority(connectionPriority: "Balanced" | "High" | "LowPower"): Promise<void>;
    setScrambleKey(): void;
    write: (buffer: Buffer, txid?: string | null | undefined) => Promise<void>;
    close(): Promise<void>;
}
export {};
//# sourceMappingURL=BleTransport.d.ts.map