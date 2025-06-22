// import {
//   Injectable,
//   NotFoundException,
//   ConflictException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     // Check if user already exists
//     const existingUser = await this.usersRepository.findOne({
//       where: { email: createUserDto.email },
//     });

//     if (existingUser) {
//       throw new ConflictException('User with this email already exists');
//     }

//     // Hash password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(
//       createUserDto.password,
//       saltRounds,
//     );

//     // Create user
//     const user = this.usersRepository.create({
//       ...createUserDto,
//       password: hashedPassword,
//     });

//     return this.usersRepository.save(user);
//   }

//   async findAll(): Promise<User[]> {
//     return this.usersRepository.find({
//       order: { createdAt: 'DESC' },
//     });
//   }

//   async findOne(id: number): Promise<User> {
//     const user = await this.usersRepository.findOne({
//       where: { id },
//     });

//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }

//     return user;
//   }

//   async findByEmail(email: string): Promise<User> {
//     return this.usersRepository.findOne({
//       where: { email },
//     });
//   }

//   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
//     const user = await this.findOne(id);

//     // Check if email is being updated and if it's already taken
//     if (updateUserDto.email && updateUserDto.email !== user.email) {
//       const existingUser = await this.usersRepository.findOne({
//         where: { email: updateUserDto.email },
//       });

//       if (existingUser) {
//         throw new ConflictException('Email is already taken');
//       }
//     }

//     // Hash password if provided
//     if (updateUserDto.password) {
//       const saltRounds = 10;
//       updateUserDto.password = await bcrypt.hash(
//         updateUserDto.password,
//         saltRounds,
//       );
//     }

//     // Update user
//     await this.usersRepository.update(id, updateUserDto);
//     return this.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     const user = await this.findOne(id);
//     await this.usersRepository.remove(user);
//   }

//   async softDelete(id: number): Promise<User> {
//     const user = await this.findOne(id);
//     user.isActive = false;
//     return this.usersRepository.save(user);
//   }
// }
