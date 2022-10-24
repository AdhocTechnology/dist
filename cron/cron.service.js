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
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const history_camera_service_1 = require("../history_camera/history_camera.service");
const camera_service_1 = require("../camera/camera.service");
const cron_1 = require("cron");
const onvif_service_1 = require("../onvif/onvif.service");
const changedCamera_service_1 = require("../changedCamera/changedCamera.service");
const scheduler_entity_1 = require("../scheduler/scheduler.entity");
const camera_entity_1 = require("../camera/camera.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let CronService = class CronService {
    constructor(schedulerRegistry, historyCameraService, cameraService, onvifService, changedCameraService, schedulerRepository, cameraRepository) {
        this.schedulerRegistry = schedulerRegistry;
        this.historyCameraService = historyCameraService;
        this.cameraService = cameraService;
        this.onvifService = onvifService;
        this.changedCameraService = changedCameraService;
        this.schedulerRepository = schedulerRepository;
        this.cameraRepository = cameraRepository;
    }
    async setupAllCrons() {
        const SchedulerArr = await this.getAllScheduler();
        SchedulerArr.forEach((element, i) => {
            this.addCronJob(element.id, element.timeHr, element.timeMin);
        });
    }
    getAllCronsId() {
        try {
            const jobs = this.schedulerRegistry.getCronJobs();
            let res = [];
            jobs.forEach((value, key) => {
                res.push(`${key}`);
            });
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAllScheduler() {
        const schedulerData = await this.schedulerRepository.find();
        return schedulerData;
    }
    addCronJob(_id, hour, min) {
        const job = new cron_1.CronJob(`0 ${min} ${hour} * * *`, async () => {
            console.log('keep log');
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
                console.log(e);
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
            const allCameraData = await this.cameraService.getAllCamera();
            await this.historyCameraService.createHistoryCamera(allCameraData, hour, min);
        });
        try {
            this.schedulerRegistry.addCronJob(_id.toString(), job);
        }
        catch (error) {
            console.log(error);
        }
        console.log(`job ${_id} added !(${hour}:${min})`);
        job.start();
    }
    deleteCron(name) {
        try {
            this.schedulerRegistry.deleteCronJob(name.toString());
        }
        catch (error) {
            console.log(error);
        }
        console.log(`job ${name} deleted!`);
    }
};
CronService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, typeorm_2.InjectRepository)(scheduler_entity_1.Scheduler)),
    __param(6, (0, typeorm_2.InjectRepository)(camera_entity_1.Camera)),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry,
        history_camera_service_1.HistoryCameraService,
        camera_service_1.CameraService,
        onvif_service_1.OnvifService,
        changedCamera_service_1.ChangedCameraService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CronService);
exports.CronService = CronService;
//# sourceMappingURL=cron.service.js.map