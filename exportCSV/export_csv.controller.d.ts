import { StreamableFile } from '@nestjs/common';
import { SearchDateDto } from '../dto/search-date.dto';
import { CameraService } from '../camera/camera.service';
import { HistoryCameraService } from '../history_camera/history_camera.service';
import { ExportCsvService } from './export_csv.service';
export declare class ExportCsvController {
    private readonly cameraService;
    private readonly exportCsvService;
    private readonly historyCameraService;
    constructor(cameraService: CameraService, exportCsvService: ExportCsvService, historyCameraService: HistoryCameraService);
    historyCamera(response: any, searchDate: SearchDateDto): Promise<any>;
    currentCamera(response: any): Promise<StreamableFile>;
}
