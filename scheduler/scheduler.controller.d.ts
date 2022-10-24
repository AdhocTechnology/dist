import { OnModuleInit } from '@nestjs/common';
import { CreateSchedulerDto } from '../dto/create-scheduler.dto';
import { UpdateSchedulerDto } from '../dto/update-scheduler.dto';
import { SchedulerService } from './scheduler.service';
import { CronService } from '../cron/cron.service';
import { Scheduler } from './scheduler.entity';
export declare class SchedulerController implements OnModuleInit {
    private readonly schedulerService;
    private readonly cronService;
    constructor(schedulerService: SchedulerService, cronService: CronService);
    onModuleInit(): Promise<void>;
    createScheduler(response: any, createSchedulerDto: CreateSchedulerDto): Promise<Scheduler>;
    updateScheduler(response: any, schedulerId: number, updateSchedulerDto: UpdateSchedulerDto): Promise<any>;
    getAllScheduler(response: any): Promise<any>;
    getScheduler(response: any, schedulerId: number): Promise<any>;
    deleteScheduler(response: any, schedulerId: number): Promise<any>;
}
