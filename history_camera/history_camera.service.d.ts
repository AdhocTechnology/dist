import { HistoryCamera } from './history_camera.entity';
import { Camera } from '../camera/camera.entity';
import { Repository } from 'typeorm';
export declare class HistoryCameraService {
    private readonly historyCameraRepository;
    constructor(historyCameraRepository: Repository<HistoryCamera>);
    createHistoryCamera(historyCameraData: Camera[], timeHr: string, timeMin: string): Promise<void>;
    getAllHistoryCamera(filter?: object): Promise<HistoryCamera[]>;
}
