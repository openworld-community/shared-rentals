import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1685958461570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
    CREATE TYPE user_role AS ENUM('user', 'moderator', 'admin);
    `);
    queryRunner.query(
      `CREATE TABLE IF NOT EXISTS
        user (id serial PRIMARY KEY, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE, role NOT NULL, created_at TIMESTAMP, updated_at TIMESTAMP)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS user`);
    queryRunner.query(`DROP TYPE IF EXISTS user_role`);
  }
}
