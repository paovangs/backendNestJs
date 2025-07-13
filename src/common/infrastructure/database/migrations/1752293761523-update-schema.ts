import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1752293761523 implements MigrationInterface {
    name = 'UpdateSchema1752293761523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "teacher_id" integer NOT NULL, "category_id" integer NOT NULL, "title" character varying(255) NOT NULL, "max_student" integer NOT NULL, "duration_hours" integer NOT NULL, "price" double precision NOT NULL, "registration_start_date" date NOT NULL, "registration_end_date" date NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "description" text NOT NULL, "status" "public"."courses_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_categories" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_626794960514393da07e942f8d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_fad76a730ee7f68d0a59652fb12" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_e4c260fe6bb1131707c4617f745" FOREIGN KEY ("category_id") REFERENCES "course_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_e4c260fe6bb1131707c4617f745"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_fad76a730ee7f68d0a59652fb12"`);
        await queryRunner.query(`DROP TABLE "course_categories"`);
        await queryRunner.query(`DROP TABLE "courses"`);
    }

}
