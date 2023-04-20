import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { CreateProfileDto } from './dto/create_profile.dto';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs'
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                @Inject('USER_SERVICE') private readonly userClient: ClientProxy) {
        this.userClient.connect()
    }

    async register(dto: CreateProfileDto) {
        this.userClient.send('get_user_by_email', dto.email).subscribe((candidate) => {
            if (candidate) {
                throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
            }
        })
        const hashPassword: string = await bcrypt.hash(dto.password, 5);
        const profile = await this.profileRepository.create(dto)
        const user = await firstValueFrom(this.userClient.send('create_user', { email: dto.email, password: hashPassword, profileId: profile.id }))
        this.profileRepository.update({ userId: user.id }, { where: { id: profile.id } })
        return await firstValueFrom(this.userClient.send('generate_token', user))
    }

    async getProfileById(id: number) {
        return await this.profileRepository.findByPk(id)
    }

    async updateProfile(id: number, dto: CreateProfileDto) {
        return await this.profileRepository.update(dto, { where: { id } })
    }

    async deleteProfileById(id: number) {
        this.userClient.emit('delete_user', id)
        return await this.profileRepository.destroy({ where: { id } })
    }
}