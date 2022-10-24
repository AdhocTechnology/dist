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
exports.SchedulerController = void 0;
const common_1 = require("@nestjs/common");
const create_scheduler_dto_1 = require("../dto/create-scheduler.dto");
const update_scheduler_dto_1 = require("../dto/update-scheduler.dto");
const scheduler_service_1 = require("./scheduler.service");
const cron_service_1 = require("../cron/cron.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let SchedulerController = class SchedulerController {
    constructor(schedulerService, cronService) {
        this.schedulerService = schedulerService;
        this.cronService = cronService;
    }
    async onModuleInit() {
        await this.cronService.setupAllCrons();
    }
    async createScheduler(response, createSchedulerDto) {
        try {
            const newScheduler = await this.schedulerService.createScheduler(createSchedulerDto);
            this.cronService.addCronJob(newScheduler.id, newScheduler.timeHr, newScheduler.timeMin);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'Scheduler has been created successfully',
                newScheduler,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async updateScheduler(response, schedulerId, updateSchedulerDto) {
        try {
            const existingScheduler = await this.schedulerService.updateScheduler(schedulerId, updateSchedulerDto);
            this.cronService.deleteCron(existingScheduler.id);
            this.cronService.addCronJob(existingScheduler.id, existingScheduler.timeHr, existingScheduler.timeMin);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Scheduler has been successfully updated',
                existingScheduler,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getAllScheduler(response) {
        try {
            const schedulerData = await this.schedulerService.getAllScheduler();
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All scheduler data found successfully', schedulerData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getScheduler(response, schedulerId) {
        try {
            const existingScheduler = await this.schedulerService.getScheduler(schedulerId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Scheduler found successfully', existingScheduler,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deleteScheduler(response, schedulerId) {
        try {
            const deletedScheduler = await this.schedulerService.deleteScheduler(schedulerId);
            this.cronService.deleteCron(schedulerId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Scheduler deleted successfully',
                deletedScheduler,
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
    __metadata("design:paramtypes", [Object, create_scheduler_dto_1.CreateSchedulerDto]),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "createScheduler", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_scheduler_dto_1.UpdateSchedulerDto]),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "updateScheduler", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "getAllScheduler", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "getScheduler", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], SchedulerController.prototype, "deleteScheduler", null);
SchedulerController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('scheduler'),
    __metadata("design:paramtypes", [scheduler_service_1.SchedulerService,
        cron_service_1.CronService])
], SchedulerController);
exports.SchedulerController = SchedulerController;
//# sourceMappingURL=scheduler.controller.js.map