import { MigrationInterface, QueryRunner } from 'typeorm';

export class Area1686312624644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    queryRunner.query(`
      CREATE TYPE "area_type" AS ENUM ('city', 'country');
    `);

    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "area" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR NOT NULL,
        "type" "area_type" NOT NULL DEFAULT 'city',
        "parentId" INTEGER,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
        FOREIGN KEY ("parentId") REFERENCES "area"("id")
      );
    `);
    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS "area"`);
    queryRunner.query(`DROP TYPE IF EXISTS "area_type"`);
  }
}
