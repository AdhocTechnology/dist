import { IAllDevicesInfoResponse, IGetAllDevicesInfo } from "./onvif.interface";
export declare const DEFAULT_PORT: number;
export declare const DEFAULT_TIMEOUT: number;
export declare class OnvifService {
    constructor();
    getAllDevicesInfo(body: IGetAllDevicesInfo[]): Promise<IAllDevicesInfoResponse[]>;
}
