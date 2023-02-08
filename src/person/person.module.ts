import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person } from 'entities/person.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'strategy';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Person],
        synchronize: false,
    }),
    TypeOrmModule.forFeature([Person]),
    JwtModule.register({
        secret: process.env.ACCESSTOKEN,
        signOptions: {expiresIn: '5m'}
    })
    ],
    controllers: [PersonController],
    providers: [PersonService, JwtStrategy],
    exports: [TypeOrmModule]
})
export class PersonModule {}
