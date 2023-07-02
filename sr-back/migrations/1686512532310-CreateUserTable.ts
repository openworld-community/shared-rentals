import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1685958461570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    queryRunner.query(`
      CREATE TYPE "user_role" AS ENUM('user', 'moderator', 'admin');
    `);

    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL, 
        "role" "user_role" NOT NULL DEFAULT 'user',
        "email" VARCHAR(255) UNIQUE,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS "user"`);
    queryRunner.query(`DROP TYPE IF EXISTS "user_role"`);
  }
}
