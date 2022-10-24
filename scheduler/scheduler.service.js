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
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const scheduler_entity_1 = require("./scheduler.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let SchedulerService = class SchedulerService {
    constructor(schedulerRepository) {
        this.schedulerRepository = schedulerRepository;
    }
    async createScheduler(createSchedulerDto) {
        const existingScheduler = await this.schedulerRepository.findOneBy({ timeHr: createSchedulerDto.timeHr, timeMin: createSchedulerDto.timeMin });
        if (existingScheduler) {
            throw new common_1.ConflictException(`scheduler is already exist`);
        }
        const newScheduler = new scheduler_entity_1.Scheduler();
        newScheduler.timeHr = createSchedulerDto.timeHr.replace(/^0+/, '');
        newScheduler.timeMin = createSchedulerDto.timeMin.replace(/^0+/, '');
        newScheduler.createAt = new Date().toISOString();
        return this.schedulerRepository.save(newScheduler);
    }
    async updateScheduler(schedulerId, updateSchedulerDto) {
        const existingScheduler = await this.schedulerRepository.findOneBy({ id: schedulerId });
        if (!existingScheduler) {
            throw new common_1.NotFoundException(`scheduler #${schedulerId} not found`);
        }
        await this.schedulerRepository.update({ id: schedulerId }, updateSchedulerDto);
        return await this.schedulerRepository.findOneBy({ id: schedulerId });
    }
    async getAllScheduler() {
        const schedulerData = await this.schedulerRepository.find();
        return schedulerData;
    }
    async getScheduler(schedulerId) {
        const existingScheduler = await this.schedulerRepository.findOneBy({ id: schedulerId });
        if (!existingScheduler) {
            throw new common_1.NotFoundException(`Scheduler #${schedulerId} not found`);
        }
        return existingScheduler;
    }
    async deleteScheduler(schedulerId) {
        const deletedScheduler = await this.schedulerRepository.findOneBy({ id: schedulerId });
        if (!deletedScheduler) {
            throw new common_1.NotFoundException(`Scheduler #${schedulerId} not found`);
        }
        await this.schedulerRepository.delete(schedulerId);
    }
};
SchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(scheduler_entity_1.Scheduler)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SchedulerService);
exports.SchedulerService = SchedulerService;
//# sourceMappingURL=scheduler.service.js.map