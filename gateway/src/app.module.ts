import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from "./user.controller";
import { ProfileController } from "./profile.controller";

@Module({
    controllers: [UserController, ProfileController],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RMQ_URL],
                    queue: 'user_queue'
                },
            },
        ]),
        ClientsModule.register([
            {
                name: 'PROFILE_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RMQ_URL],
                    queue: 'profile_queue'
                },
            },
        ])
    ]
})
export class AppModule { }