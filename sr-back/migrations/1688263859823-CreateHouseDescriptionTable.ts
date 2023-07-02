import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHouseDescriptionTable1688263859823
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "house_description" (
      "id" SERIAL PRIMARY KEY,
      "wifi" boolean,
      "washingmachine" boolean,
      "wifi" boolean,
      "number_of_rooms" SMALLSERIAL NOT NULL,
      "stove" boolean,
      "oven" boolean,
      "work_table" boolean,
      "microwave" boolean,
      "air_conditioner" boolean,
      "price_per_person" SMALLSERIAL NOT NULL,
      "contract_term" SMALLSERIAL NOT NULL,
      "description" VARCHAR(300),
      "accommodation_link" VARCHAR(255),
      "expectation_date" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
      "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE IF EXISTS "house_description"`);
  }
}
