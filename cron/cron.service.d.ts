import { SchedulerRegistry } from '@nestjs/schedule';
import { HistoryCameraService } from '../history_camera/history_camera.service';
import { CameraService } from '../camera/camera.service';
import { OnvifService } from '../onvif/onvif.service';
import { ChangedCameraService } from '../changedCamera/changedCamera.service';
import { Scheduler } from '../scheduler/scheduler.entity';
import { Camera } from '../camera/camera.entity';
import { Repository } from 'typeorm';
export declare class CronService {
    private schedulerRegistry;
    private readonly historyCameraService;
    private readonly cameraService;
    private readonly onvifService;
    private readonly changedCameraService;
    private readonly schedulerRepository;
    private readonly cameraRepository;
    constructor(schedulerRegistry: SchedulerRegistry, historyCameraService: HistoryCameraService, cameraService: CameraService, onvifService: OnvifService, changedCameraService: ChangedCameraService, schedulerRepository: Repository<Scheduler>, cameraRepository: Repository<Camera>);
    setupAllCrons(): Promise<void>;
    getAllCronsId(): any[];
    getAllScheduler(): Promise<Scheduler[]>;
    addCronJob(_id: number, hour: string, min: string): void;
    deleteCron(name: number): void;
}
