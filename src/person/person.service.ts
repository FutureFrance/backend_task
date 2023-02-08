import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'entities/person.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IPerson, ICreate } from 'interfaces/user.interfaces';

@Injectable()
export class PersonService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Person) private PersonsRepository: Repository<Person>,
  ) {}

  async register(personData: PersonDto): Promise<ICreate> {
    const isPerson = await this.PersonsRepository.findOne({where: {
      email: personData.email
    }});

    if (isPerson) throw new BadRequestException('User already has an account');

    const hashedPass = await bcrypt.hash(personData.password, 10);

    const Person = await this.PersonsRepository.insert({
      firstname: personData.firstname,
      lastname: personData.lastname,
      email: personData.email,
      password: hashedPass
    });

    return {id: Person.raw[0].id, person: personData};
  }

  async login(PersonData: PersonDto): Promise<string> {
    const isPerson = await this.PersonsRepository.findOne({where: {
      email: PersonData.email
    }});

    if (!isPerson) throw new BadRequestException('No such user');

    const isMatch = await bcrypt.compare(PersonData.password, isPerson.password);

    if (!isMatch) throw new UnauthorizedException(); 
    
    return this.jwtService.sign({email: isPerson.email});
  }

  async getProfile(email: string): Promise<Omit<IPerson, 'password'>> {
    const person = await this.PersonsRepository.findOne({
      where: { email },
    });

    const {password, ...restPerson} = person;

    return restPerson;
  }
}


