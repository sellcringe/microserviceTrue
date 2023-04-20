import { CreateUserDto } from "src/dto/create_user.dto";

export class CreateProfileDto extends CreateUserDto {
    readonly name: string;
    readonly surname: string;
    readonly phone: string;
}