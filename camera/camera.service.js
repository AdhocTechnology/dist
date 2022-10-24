"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraService = exports.NUMBER_OF_LOOP_CHECKING = void 0;
const common_1 = require("@nestjs/common");
const camera_entity_1 = require("./camera.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
exports.NUMBER_OF_LOOP_CHECKING = 3;
let CameraService = class CameraService {
    constructor(cemeraRepository) {
        this.cemeraRepository = cemeraRepository;
    }
    async createCamera(createCameraDto) {
        const existingCamera = await this.cemeraRepository.findOneBy({ ipCamera: createCameraDto.ipCamera });
        if (existingCamera) {
            throw new common_1.ConflictException(`camera is already exist`);
        }
        const newCamera = new camera_entity_1.Camera();
        newCamera.ipCamera = createCameraDto.ipCamera;
        newCamera.username = createCameraDto.username;
        newCamera.password = createCameraDto.password;
        newCamera.warrantyExp = createCameraDto.warrantyExp;
        newCamera.status = false;
        newCamera.model = '-';
        newCamera.createAt = new Date().toISOString();
        return this.cemeraRepository.save(newCamera);
    }
    async updateCamera(cameraId, updateCameraDto) {
        const existingCamera = await this.cemeraRepository.findOne({ where: { id: cameraId } });
        if (!existingCamera) {
            throw new common_1.NotFoundException(`camera #${cameraId} not found`);
        }
        await this.cemeraRepository.update({ id: cameraId }, updateCameraDto);
        return await this.cemeraRepository.findOneBy({ id: cameraId });
    }
    async findOneAndUpdate(where, updateCameraDto) {
        const existingCamera = await this.cemeraRepository.findOneBy(where);
        if (!existingCamera) {
            throw new common_1.NotFoundException(`camera not found`);
        }
        await this.cemeraRepository.update(where, updateCameraDto);
        return await this.cemeraRepository.findOneBy(where);
    }
    async clearStatus() {
        await this.cemeraRepository.update({}, { status: false });
    }
    async getAllCamera(filter) {
        const cameraData = await this.cemeraRepository.find(filter);
        return cameraData;
    }
    async getUsernamePasswordCamera() {
        const cameraData = await this.cemeraRepository.createQueryBuilder('c').select(['c.ipCamera', 'c.username', 'c.password']).getMany();
        return cameraData;
    }
    async getCamera(cameraId) {
        const existingCamera = await this.cemeraRepository.findOneBy({ id: cameraId });
        if (!existingCamera) {
            throw new common_1.NotFoundException(`Camera #${cameraId} not found`);
        }
        return existingCamera;
    }
    async getCameraWithIP(ipCamera) {
        const existingCamera = await this.cemeraRepository.findOneBy({ ipCamera: ipCamera });
        if (!existingCamera) {
            throw new common_1.NotFoundException(`Camera ip : ${ipCamera} not found`);
        }
        return existingCamera;
    }
    async deleteCamera(cameraId) {
        const deletedCamera = await this.cemeraRepository.findOneBy({ id: cameraId });
        if (!deletedCamera) {
            throw new common_1.NotFoundException(`Camera #${cameraId} not found`);
        }
        await this.cemeraRepository.delete(cameraId);
    }
};
CameraService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(camera_entity_1.Camera)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CameraService);
exports.CameraService = CameraService;
//# sourceMappingURL=camera.service.js.map