import { Camera } from '../camera/camera.entity';
import { HistoryCamera } from '../history_camera/history_camera.entity';
export declare class ExportCsvService {
    constructor();
    createCurrentCSV(cameraData: Camera[]): Promise<string>;
    writeCSV(data: any, ws: any): Promise<unknown>;
    createHistoryCSV(historyCameraData: HistoryCamera[]): Promise<string>;
}
