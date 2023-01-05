import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/AuthCredentialDto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.userRepository.CreateUser(authCredentialDto);
  }
}
