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
exports.ChangedCameraService = void 0;
const common_1 = require("@nestjs/common");
const changedCamera_entity_1 = require("./changedCamera.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ChangedCameraService = class ChangedCameraService {
    constructor(changedCemeraRepository) {
        this.changedCemeraRepository = changedCemeraRepository;
    }
    async createChangedCamera(createChangedCameraDto) {
        const newChangedCamera = new changedCamera_entity_1.ChangedCamera();
        newChangedCamera.ipCamera = createChangedCameraDto.ipCamera;
        newChangedCamera.oldModel = createChangedCameraDto.oldModel;
        newChangedCamera.oldManufacturer = createChangedCameraDto.oldManufacturer;
        newChangedCamera.oldSerialNumber = createChangedCameraDto.oldSerialNumber;
        newChangedCamera.oldHardwareId = createChangedCameraDto.oldHardwareId;
        newChangedCamera.oldFirmwareVersion = createChangedCameraDto.oldFirmwareVersion;
        newChangedCamera.oldPort = createChangedCameraDto.oldPort;
        newChangedCamera.newModel = createChangedCameraDto.newModel;
        newChangedCamera.newManufacturer = createChangedCameraDto.newManufacturer;
        newChangedCamera.newSerialNumber = createChangedCameraDto.newSerialNumber;
        newChangedCamera.newHardwareId = createChangedCameraDto.newHardwareId;
        newChangedCamera.newFirmwareVersion = createChangedCameraDto.newFirmwareVersion;
        newChangedCamera.newPort = createChangedCameraDto.newPort;
        newChangedCamera.createAt = new Date().toISOString();
        return this.changedCemeraRepository.save(newChangedCamera);
    }
};
ChangedCameraService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(changedCamera_entity_1.ChangedCamera)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ChangedCameraService);
exports.ChangedCameraService = ChangedCameraService;
//# sourceMappingURL=changedCamera.service.js.map