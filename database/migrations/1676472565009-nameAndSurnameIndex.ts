import { MigrationInterface, QueryRunner } from 'typeorm'

export class nameAndSurnameIndex1676472565009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX index_on_surname_name
      ON public."user" USING btree
      (name bpchar_pattern_ops ASC NULLS LAST, surname bpchar_pattern_ops ASC NULLS LAST)
      INCLUDE(name, surname)
      TABLESPACE pg_default;`,
    )
    await queryRunner.query(
      `CREATE INDEX index_name
    ON public."user" USING btree
    (name ASC NULLS LAST)
    TABLESPACE pg_default;`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "index_on_surname_name"`)
  }
}
