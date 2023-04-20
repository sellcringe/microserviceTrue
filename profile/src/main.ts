import { NestFactory } from '@nestjs/core';
import { ProfileModule } from './profile.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function start() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProfileModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: process.env.RMQ_QUEUE
      }
    }
  );
  
  await app.listen();
}
start();