import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {
        this.userClient.connect()
    }

    @Post('/login')
    async login(@Body() dto: CreateUserDto) {
        return await firstValueFrom(this.userClient.send('login', dto))
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return await firstValueFrom(this.userClient.send('create_user', dto))
    }

    @Get()
    async getByEmail(@Body() data: { email: string }) {
        return await firstValueFrom(this.userClient.send('get_user_by_email', data.email))
    }

    @Get('/all')
    async getAll() {
        return await firstValueFrom(this.userClient.send('get_all_users', ''))
    }

    @Delete()
    async deleteByEmail(@Body() data: { email: string }) {
        return await firstValueFrom(this.userClient.send('delete_user', data.email))
    }
}
