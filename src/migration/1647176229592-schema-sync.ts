import { MigrationInterface, QueryRunner } from 'typeorm';

export class schemaSync1647176229592 implements MigrationInterface {
  name = 'schemaSync1647176229592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shop" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "description"`);
  }
}
