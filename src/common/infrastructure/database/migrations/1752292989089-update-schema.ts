import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1752292989089 implements MigrationInterface {
    name = 'UpdateSchema1752292989089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_educations" ("id" SERIAL NOT NULL, "student_id" integer NOT NULL, "level" character varying NOT NULL, "field_of_study" character varying NOT NULL, "current_occupation" character varying NOT NULL, "work_experience" integer NOT NULL, "status" "public"."student_educations_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_6b064fa523add56ec0259fc1453" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "name" character varying(255) NOT NULL, "surname" character varying(255), "birth_date" date, "gender" "public"."students_gender_enum", "address" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_fb3eff90b11bddf7285f9b4e28" UNIQUE ("user_id"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "specialization" text NOT NULL, "experience" integer NOT NULL, "education" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "REL_4668d4752e6766682d1be0b346" UNIQUE ("user_id"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(255), "email" character varying(255), "password" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "student_educations" ADD CONSTRAINT "FK_63c59ca064db351fd9510d9ed9c" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD CONSTRAINT "FK_4668d4752e6766682d1be0b346f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teachers" DROP CONSTRAINT "FK_4668d4752e6766682d1be0b346f"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`);
        await queryRunner.query(`ALTER TABLE "student_educations" DROP CONSTRAINT "FK_63c59ca064db351fd9510d9ed9c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "student_educations"`);
    }

}
