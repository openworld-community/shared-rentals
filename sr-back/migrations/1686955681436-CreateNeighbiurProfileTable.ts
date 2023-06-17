import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNeighbiurProfileTable1686955681436
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    queryRunner.query(`
      CREATE TYPE "gender_type" AS ENUM('man', 'woman');
    `);
    queryRunner.query(`
      CREATE TYPE "tenant_status" AS ENUM('solo', 'family', 'friends');
    `);
    queryRunner.query(`
      CREATE TYPE "rental_period" AS ENUM('few_weeks', 'few_months', 'year_and_more');
    `);

    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "neighbour_profile" (
          "id" SERIAL PRIMARY KEY,
          "userId" SERIAL REFERENCES "user" ("id"),
          "age" SMALLSERIAL NOT NULL,
          "gender" "gender_type" NOT NULL,
          "tenantStatus" "tenant_status" NOT NULL,
          "pets" boolean,
          "petsDescription" VARCHAR(255),
          "countryId" SERIAL REFERENCES "area" ("id"),
          "cityId" SERIAL REFERENCES "area" ("id"),
          "rentalPerdiod" "rental_period" NOT NULL,
          "budget" SMALLSERIAL,
          "description" VARCHAR(300),
          "photoLink" VARCHAR(255) NOT NULL,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
        );
    `);

    await queryRunner.commitTransaction();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS "neighbour_profile"`);
    queryRunner.query(`DROP TYPE IF EXISTS "gender_type"`);
    queryRunner.query(`DROP TYPE IF EXISTS "tenant_status"`);
    queryRunner.query(`DROP TYPE IF EXISTS "rental_period"`);
  }
}
