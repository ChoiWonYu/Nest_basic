import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/AuthCredentialDto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.userRepository.CreateUser(authCredentialDto);
  }
  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { userName, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ userName });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'LogIn success';
    } else {
      throw new UnauthorizedException('Login failed');
    }
  }
}
