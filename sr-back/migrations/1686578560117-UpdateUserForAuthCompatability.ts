import { MigrationInterface, QueryRunner } from 'typeorm';

// prettier-ignore
export class UpdateUserForAuthCompatability1686578560117 implements MigrationInterface {
    name = 'UpdateUserForAuthCompatability1686578560117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "area_parentId_fkey"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" TIMESTAMP NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TYPE "public"."user_role" RENAME TO "user_role_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'moderator', 'admin')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum" USING "role"::"text"::"public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_old"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TYPE "public"."area_type" RENAME TO "area_type_old"`);
        await queryRunner.query(`CREATE TYPE "public"."area_type_enum" AS ENUM('city', 'country')`);
        await queryRunner.query(`ALTER TABLE "area" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "area" ALTER COLUMN "type" TYPE "public"."area_type_enum" USING "type"::"text"::"public"."area_type_enum"`);
        await queryRunner.query(`ALTER TABLE "area" ALTER COLUMN "type" SET DEFAULT 'city'`);
        await queryRunner.query(`DROP TYPE "public"."area_type_old"`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_f2b11f740f68f3ccc2857a1f140" FOREIGN KEY ("parentId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_f2b11f740f68f3ccc2857a1f140"`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "area" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`CREATE TYPE "public"."area_type_old" AS ENUM('city', 'country')`);
        await queryRunner.query(`ALTER TABLE "area" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "area" ALTER COLUMN "type" TYPE "public"."area_type_old" USING "type"::"text"::"public"."area_type_old"`);
        await queryRunner.query(`ALTER TABLE "area" ALTER COLUMN "type" SET DEFAULT 'city'`);
        await queryRunner.query(`DROP TYPE "public"."area_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."area_type_old" RENAME TO "area_type"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_old" AS ENUM('user', 'moderator', 'admin')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_old" USING "role"::"text"::"public"."user_role_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_role_old" RENAME TO "user_role"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "area_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
