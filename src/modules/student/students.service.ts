import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { StudentOrmEntity } from 'src/common/infrastructure/database/typeorms/entities/student.orm';
import { CreateStudentDto } from './dto/create.dto';
import { UserOrmEntity } from 'src/common/infrastructure/database/typeorms/entities/user.orm';
import { hashPassword } from 'src/common/utils/hash-password';
import { TRANSACTION_MANAGER_SERVICE } from 'src/common/constants/inject-key';
import { ITransactionManager } from 'src/common/infrastructure/transaction/transaction.interface';
import { PaginatedResponse } from 'src/common/pagination/pagination.response';
import { paginateQueryBuilder } from 'src/common/utils/pagination.builder';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentOrmEntity)
    private _studentRepo: Repository<StudentOrmEntity>,
    @InjectRepository(UserOrmEntity)
    private _userRepo: Repository<UserOrmEntity>,
    @Inject(TRANSACTION_MANAGER_SERVICE)
    private readonly transactionManagerService: ITransactionManager,
    private readonly dataSource: DataSource,
  ) {}
  async create(body: CreateStudentDto): Promise<StudentOrmEntity> {
    try {
      const savedStudent =
        await this.transactionManagerService.runInTransaction(
          this.dataSource,
          async (manager) => {
            const passwordHash = await hashPassword(body.password);

            const user = manager.create(UserOrmEntity, {
              username: body.name,
              email: body.email,
              password: passwordHash,
            });
            const savedUser = await manager.save(UserOrmEntity, user);

            const student = manager.create(StudentOrmEntity, {
              name: body.name,
              user_id: savedUser.id,
            });
            return await manager.save(StudentOrmEntity, student);
          },
        );
      return savedStudent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllStudent(
    query: any,
  ): Promise<PaginatedResponse<StudentOrmEntity>> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const queryBuilder = this._studentRepo
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user');

    return paginateQueryBuilder(queryBuilder, page, limit);
  }
}
