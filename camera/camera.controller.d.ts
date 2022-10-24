import { CreateCameraDto } from '../dto/create-camera.dto';
import { UpdateCameraDto } from '../dto/update-camera.dto';
import { CameraService } from './camera.service';
import { OnvifService } from '../onvif/onvif.service';
import { ChangedCameraService } from '../changedCamera/changedCamera.service';
import { Camera } from './camera.entity';
export declare class CameraController {
    private readonly cameraService;
    private readonly onvifService;
    private readonly changedCameraService;
    constructor(cameraService: CameraService, onvifService: OnvifService, changedCameraService: ChangedCameraService);
    createCamera(response: any, createCameraDto: CreateCameraDto): Promise<Camera>;
    updateCamera(response: any, cameraId: number, updateCameraDto: UpdateCameraDto): Promise<any>;
    getAllCamera(response: any): Promise<any>;
    getCamera(response: any, cameraId: number): Promise<any>;
    deleteCamera(response: any, cameraId: number): Promise<any>;
}
