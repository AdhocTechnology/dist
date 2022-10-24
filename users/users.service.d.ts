import { User } from './users.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(username: string, password: string): Promise<User>;
    getUser(username: string): Promise<User>;
}
