import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNeighbourRequirements1688334893483
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "neighbour_requirements" (
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS "neighbour_requirements"`);
  }
}
