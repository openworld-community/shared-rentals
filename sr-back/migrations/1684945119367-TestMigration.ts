import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigration1684945119367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `CREATE TABLE IF NOT EXISTS
        app (id serial PRIMARY KEY, lastRequestedAt TIMESTAMP NOT NULL)`,
    );
    queryRunner.query(`INSERT INTO app (lastRequestedAt) VALUES (NOW())`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE app IF EXISTS`);
  }
}
