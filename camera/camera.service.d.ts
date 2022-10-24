import { CreateCameraDto } from '../dto/create-camera.dto';
import { UpdateCameraDto } from '../dto/update-camera.dto';
import { Camera } from './camera.entity';
import { Repository } from 'typeorm';
export declare const NUMBER_OF_LOOP_CHECKING: number;
export declare class CameraService {
    private readonly cemeraRepository;
    constructor(cemeraRepository: Repository<Camera>);
    createCamera(createCameraDto: CreateCameraDto): Promise<Camera>;
    updateCamera(cameraId: number, updateCameraDto: UpdateCameraDto): Promise<Camera>;
    findOneAndUpdate(where: object, updateCameraDto: UpdateCameraDto): Promise<Camera>;
    clearStatus(): Promise<void>;
    getAllCamera(filter?: object): Promise<Camera[]>;
    getUsernamePasswordCamera(): Promise<Camera[]>;
    getCamera(cameraId: number): Promise<Camera>;
    getCameraWithIP(ipCamera: string): Promise<Camera>;
    deleteCamera(cameraId: number): Promise<void>;
}
