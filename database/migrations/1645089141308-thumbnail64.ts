import { MigrationInterface, QueryRunner } from 'typeorm'

export class thumbnail641645089141308 implements MigrationInterface {
  name = 'thumbnail641645089141308'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "thumbnail64" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "thumbnail64"`)
  }
}
