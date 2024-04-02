import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";

export abstract class UsersRepository {
    abstract create(data: CreateUserDto): Promise<User>
}