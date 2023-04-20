import { Controller } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create_profile.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @MessagePattern('register')
    async register(@Payload() dto: CreateProfileDto) {
        return await this.profileService.register(dto)
    }

    @MessagePattern('get_profile_by_id')
    async getById(@Payload() id: number) {
        return await this.profileService.getProfileById(id);
    }

    @MessagePattern('update_profile')
    async update(@Payload() data: { id: number, dto: CreateProfileDto }) {
        return await this.profileService.updateProfile(data.id, data.dto)
    }

    @MessagePattern('delete_profile')
    async deleteById(@Payload() id: number) {
        return await this.profileService.deleteProfileById(id)
    }
}
