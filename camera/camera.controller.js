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
exports.CameraController = void 0;
const common_1 = require("@nestjs/common");
const create_camera_dto_1 = require("../dto/create-camera.dto");
const update_camera_dto_1 = require("../dto/update-camera.dto");
const camera_service_1 = require("./camera.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const onvif_service_1 = require("../onvif/onvif.service");
const changedCamera_service_1 = require("../changedCamera/changedCamera.service");
let CameraController = class CameraController {
    constructor(cameraService, onvifService, changedCameraService) {
        this.cameraService = cameraService;
        this.onvifService = onvifService;
        this.changedCameraService = changedCameraService;
    }
    async createCamera(response, createCameraDto) {
        try {
            const newCamera = await this.cameraService.createCamera(createCameraDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'Camera has been created successfully',
                newCamera,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async updateCamera(response, cameraId, updateCameraDto) {
        try {
            const existingCamera = await this.cameraService.updateCamera(cameraId, updateCameraDto);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Camera has been successfully updated',
                existingCamera,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getAllCamera(response) {
        const oldCameraData = await this.cameraService.getUsernamePasswordCamera();
        const devicesPromise = [];
        let devices = [];
        try {
            if (oldCameraData.length > 0) {
                for (let i = 0; i < camera_service_1.NUMBER_OF_LOOP_CHECKING; i++) {
                    devicesPromise.push(this.onvifService.getAllDevicesInfo(oldCameraData));
                }
                const res = await Promise.all(devicesPromise);
                for (let i = 0; i < res.length; i++) {
                    devices = devices.concat(res[i]);
                }
            }
        }
        catch (e) {
            throw new common_1.HttpException({
                reason: 'error.get.all.devices.info',
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        let responseData;
        const duplicateIds = devices
            .map(v => v.ipCamera)
            .filter((v, i, vIds) => vIds.indexOf(v) !== i);
        const duplicates = devices
            .filter(obj => duplicateIds.includes(obj.ipCamera));
        const filterObj = duplicates.filter((value, index, self) => index === self.findIndex((t) => (t.ipCamera === value.ipCamera)));
        responseData = {
            devices: filterObj,
            responseTime: new Date()
        };
        if (responseData.devices.length === 0) {
            responseData = {
                devices: [],
                responseTime: new Date()
            };
        }
        const responseDevices = responseData.devices;
        const responseTime = responseData.responseTime.toISOString();
        const allCameraIp = oldCameraData.map(x => x.ipCamera);
        const camerasConnected = responseDevices.filter(obj => allCameraIp.includes(obj.ipCamera));
        await this.cameraService.clearStatus();
        for (let i = 0; i < camerasConnected.length; i++) {
            const oldCameraDetail = await this.cameraService.getCameraWithIP(camerasConnected[i].ipCamera);
            if ((oldCameraDetail.serialNumber !== "") && (oldCameraDetail.serialNumber !== camerasConnected[i].serialNumber.toString())) {
                const changedCamera = {
                    ipCamera: oldCameraDetail.ipCamera,
                    oldModel: oldCameraDetail.model,
                    oldManufacturer: oldCameraDetail.manufacturer,
                    oldSerialNumber: oldCameraDetail.serialNumber,
                    oldHardwareId: oldCameraDetail.hardwareId,
                    oldFirmwareVersion: oldCameraDetail.firmwareVersion,
                    oldPort: oldCameraDetail.port,
                    newModel: camerasConnected[i].model,
                    newManufacturer: camerasConnected[i].manufacturer,
                    newSerialNumber: camerasConnected[i].serialNumber.toString(),
                    newHardwareId: camerasConnected[i].hardwareId,
                    newFirmwareVersion: camerasConnected[i].firmwareVersion,
                    newPort: camerasConnected[i].port,
                };
                await this.changedCameraService.createChangedCamera(changedCamera);
            }
            camerasConnected[i].status = true;
            camerasConnected[i].responseTime = responseTime;
            const filter = { ipCamera: camerasConnected[i].ipCamera };
            const update = camerasConnected[i];
            await this.cameraService.findOneAndUpdate(filter, update);
        }
        try {
            const cameraData = await this.cameraService.getAllCamera();
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All camera data found successfully', cameraData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getCamera(response, cameraId) {
        try {
            const existingCamera = await this.cameraService.getCamera(cameraId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Camera found successfully', existingCamera,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteCamera(response, cameraId) {
        try {
            const deletedCamera = await this.cameraService.deleteCamera(cameraId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Camera deleted successfully',
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_camera_dto_1.CreateCameraDto]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "createCamera", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_camera_dto_1.UpdateCameraDto]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "updateCamera", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "getAllCamera", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "getCamera", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "deleteCamera", null);
CameraController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('camera'),
    __metadata("design:paramtypes", [camera_service_1.CameraService,
        onvif_service_1.OnvifService,
        changedCamera_service_1.ChangedCameraService])
], CameraController);
exports.CameraController = CameraController;
//# sourceMappingURL=camera.controller.js.map