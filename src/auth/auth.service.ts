import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from 'src/common/infrastructure/database/typeorms/entities/user.orm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/user/dto/create.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private _userRepo: Repository<UserOrmEntity>,
    private _jwtService: JwtService,
  ) {}
  async login(body: any): Promise<any> {
    const result = await this._userRepo.findOne({
      where: { email: body.email },
    });
    if (!result) {
      throw new UnauthorizedException('invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      result.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid email or password');
    }

    const payload = {
      username: result.username,
      sub: result.id,
      roles: ['superadmin', 'admin', 'user'], // Example roles, adjust as needed
    };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }

  async register(body: CreateUserDto): Promise<UserOrmEntity> {
    const existingUser = await this._userRepo.findOne({
      where: { email: body.email },
    });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = this._userRepo.create({
      email: body.email,
      username: body.username,
      password: hashedPassword,
    });

    const savedUser = await this._userRepo.save(newUser);
    return savedUser;
  }
  async updateUser(id: number, body: UpdateUserDto): Promise<UserOrmEntity> {
    const user = await this._userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.email = body.email;
    user.username = body.username;

    return await this._userRepo.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this._userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this._userRepo.remove(user);
  }
}
