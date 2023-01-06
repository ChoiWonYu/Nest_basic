import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/AuthCredentialDto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IToken } from './type/TokenType';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    await this.userRepository.CreateUser(authCredentialDto);
  }
  async signIn(authCredentialDto: AuthCredentialDto): Promise<IToken> {
    const { userName, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userName };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Login failed');
    }
  }
}
