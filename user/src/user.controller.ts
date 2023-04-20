import { Controller} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create_user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @MessagePattern('login')
    async login(@Payload() dto: CreateUserDto) {
        return await this.userService.login(dto)
    }

    @MessagePattern('create_user')
    async create(@Payload() dto: CreateUserDto) {
        return await this.userService.createUser(dto)
    }

    @MessagePattern('get_user_by_email')
    async getByEmail(@Payload() email: string) {
        return await this.userService.getUserByEmail(email)
    }

    @MessagePattern('get_all_users')
    async getAll() {
        return await this.userService.getAllUsers();
    }

    @MessagePattern('delete_user')
    async deleteById(@Payload() data: {id: number}) {
        return await this.userService.deleteUserById(data.id)
    }
}
