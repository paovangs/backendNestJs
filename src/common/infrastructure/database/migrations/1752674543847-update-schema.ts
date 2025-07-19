import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSchema1752674543847 implements MigrationInterface {
  name = 'UpdateSchema1752674543847';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."apply_courses_status_enum" AS ENUM('pending', 'approved', 'rejected')`,
    );
    await queryRunner.query(
      `CREATE TABLE "apply_courses" ("id" SERIAL NOT NULL, "course_id" integer NOT NULL, "student_id" integer NOT NULL, "price" double precision NOT NULL, "reason" text, "status" "public"."apply_courses_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_de0433af110a9107a7d66d3bd0f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "apply_courses" ADD CONSTRAINT "FK_843d7a945292fc7718d1fbd3868" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apply_courses" ADD CONSTRAINT "FK_e84520cb1e3cf16cde59bb2471c" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "apply_courses" DROP CONSTRAINT "FK_e84520cb1e3cf16cde59bb2471c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "apply_courses" DROP CONSTRAINT "FK_843d7a945292fc7718d1fbd3868"`,
    );
    await queryRunner.query(`DROP TABLE "apply_courses"`);
    await queryRunner.query(`DROP TYPE "public"."apply_courses_status_enum"`);
  }
}
