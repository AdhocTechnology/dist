import { CreateChangedCameraDto } from '../dto/create-changed_camera.dto';
import { ChangedCamera } from './changedCamera.entity';
import { Repository } from 'typeorm';
export declare class ChangedCameraService {
    private readonly changedCemeraRepository;
    constructor(changedCemeraRepository: Repository<ChangedCamera>);
    createChangedCamera(createChangedCameraDto: CreateChangedCameraDto): Promise<ChangedCamera>;
}
