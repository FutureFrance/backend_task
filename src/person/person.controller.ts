import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { PersonDto } from './dto/person.dto';
import { JwtAuthGuard } from 'guards/jwt.guard';
import { PersonService } from './person.service';
import { IPerson, ICreate } from 'interfaces/user.interfaces';
import { InsertResult } from 'typeorm';

interface IEmail {
  email: string
}

interface IRequest extends Request {
  user: IEmail
}

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post("register")
  async register(@Body() personData: PersonDto): Promise<ICreate> {
    return await this.personService.register(personData);
  }

  @Post("login") 
  async login(@Body() personData: PersonDto): Promise<string> {
    return await this.personService.login(personData);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async getProfile(@Req() request: IRequest): Promise<IPerson> {
    const email = request.user.email;
    console.log(email)
    return await this.personService.getProfile(email);
  }
}
