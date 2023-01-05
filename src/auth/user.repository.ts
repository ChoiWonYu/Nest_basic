import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/AuthCredentialDto';
import { User } from './user.entity';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async CreateUser(authCredentialDto: AuthCredentialDto) {
    const { userName, password } = authCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ userName, password: hashedPassword });

    try {
      await this.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Existing username');
      }
    }
  }
}
