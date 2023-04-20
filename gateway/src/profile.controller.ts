import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateProfileDto } from './dto/create_profile.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('profile')
export class ProfileController {
    constructor(@Inject('PROFILE_SERVICE') private readonly profileClient: ClientProxy) {
        this.profileClient.connect()
    }

    @Post()
    async register(@Body() dto: CreateProfileDto) {
        return await firstValueFrom(this.profileClient.send('register', dto))
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return await firstValueFrom(this.profileClient.send('get_profile_by_id', id))
    }

    @Put()
    async update(@Param('id') id: number, @Body() dto: CreateProfileDto) {
        return await firstValueFrom(this.profileClient.send('update_profile', { id, dto }))
    }

    @Delete('/:id')
    async deleteById(@Param() id: number) {
        return await firstValueFrom(this.profileClient.send('delete_profile', id))
    }
}
