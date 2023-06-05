import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1685958461570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TYPE UserRole AS ENUM('user', 'moderator', 'admin);
    `);
    queryRunner.query(
      `CREATE TABLE IF NOT EXISTS
        user (id serial PRIMARY KEY, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE, role NOT NULL, createdAt TIMESTAMP, updatedAt TIMESTAMP)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE user IF EXISTS`);
  }
}
