import { IGetAllDevicesInfo } from "./onvif.interface";
export declare class MGetAllDevicesInfo implements IGetAllDevicesInfo {
    ipCamera: string;
    password: string;
    username: string;
}
export declare class MGetConnectionStatus implements IGetAllDevicesInfo {
    ipCamera: string;
    password: string;
    username: string;
}
