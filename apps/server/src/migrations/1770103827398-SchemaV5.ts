import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaV51770103827398 implements MigrationInterface {
  name = 'SchemaV51770103827398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`problem\`
      MODIFY COLUMN \`desc_detail\` text NULL
    `);

    await queryRunner.query(`
      UPDATE \`problem\`
      SET \`desc_detail\` = NULL
    `);

    await queryRunner.query(`
      ALTER TABLE \`problem\`
      MODIFY COLUMN \`desc_detail\` json NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`problem\`
      MODIFY COLUMN \`desc_detail\` text NULL
    `);
  }
}
