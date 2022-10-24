import { CreateSchedulerDto } from '../dto/create-scheduler.dto';
import { UpdateSchedulerDto } from '../dto/update-scheduler.dto';
import { Scheduler } from './scheduler.entity';
import { Repository } from 'typeorm';
export declare class SchedulerService {
    private readonly schedulerRepository;
    constructor(schedulerRepository: Repository<Scheduler>);
    createScheduler(createSchedulerDto: CreateSchedulerDto): Promise<Scheduler>;
    updateScheduler(schedulerId: number, updateSchedulerDto: UpdateSchedulerDto): Promise<Scheduler>;
    getAllScheduler(): Promise<Scheduler[]>;
    getScheduler(schedulerId: number): Promise<Scheduler>;
    deleteScheduler(schedulerId: number): Promise<void>;
}
