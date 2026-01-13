import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaV31768285856362 implements MigrationInterface {
  name = 'SchemaV31768285856362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP FOREIGN KEY \`problem_ibfk_1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`related_problem\` DROP FOREIGN KEY \`related_problem_ibfk_1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`related_problem\` DROP FOREIGN KEY \`related_problem_ibfk_2\``,
    );
    await queryRunner.query(`DROP INDEX \`solution_id\` ON \`problem\``);
    await queryRunner.query(`DROP INDEX \`email\` ON \`user\``);
    await queryRunner.query(
      `DROP INDEX \`related_problem_id\` ON \`related_problem\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`cookbook\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`tags\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cookbook_problem\` (\`cookbook_id\` int NOT NULL, \`problem_id\` int NOT NULL, \`order_number\` int NOT NULL, PRIMARY KEY (\`cookbook_id\`, \`problem_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`solution_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`service_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`difficulty\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`estimated_time\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` DROP COLUMN \`config_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` DROP COLUMN \`config_info\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`required_fields\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`tags\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD \`answer_config\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD \`problem_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD UNIQUE INDEX \`IDX_bf64cb1bb965b24b4b8e1b71b6\` (\`problem_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`password\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` CHANGE \`title\` \`title\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_bf64cb1bb965b24b4b8e1b71b6\` ON \`solution\` (\`problem_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_5f607f8f83b7d4be18df1ec5cb\` ON \`related_problem\` (\`problem_id\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_90fbbf944326dfaea5586bc922\` ON \`related_problem\` (\`related_problem_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD CONSTRAINT \`FK_bf64cb1bb965b24b4b8e1b71b68\` FOREIGN KEY (\`problem_id\`) REFERENCES \`problem\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cookbook_problem\` ADD CONSTRAINT \`FK_d989ccc1bae14f77d4c728b9d63\` FOREIGN KEY (\`cookbook_id\`) REFERENCES \`cookbook\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cookbook_problem\` ADD CONSTRAINT \`FK_a06db1e83d1a9243c70a8deeb39\` FOREIGN KEY (\`problem_id\`) REFERENCES \`problem\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`related_problem\` ADD CONSTRAINT \`FK_5f607f8f83b7d4be18df1ec5cbf\` FOREIGN KEY (\`problem_id\`) REFERENCES \`problem\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`related_problem\` ADD CONSTRAINT \`FK_90fbbf944326dfaea5586bc922e\` FOREIGN KEY (\`related_problem_id\`) REFERENCES \`problem\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`related_problem\` DROP FOREIGN KEY \`FK_90fbbf944326dfaea5586bc922e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`related_problem\` DROP FOREIGN KEY \`FK_5f607f8f83b7d4be18df1ec5cbf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cookbook_problem\` DROP FOREIGN KEY \`FK_a06db1e83d1a9243c70a8deeb39\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cookbook_problem\` DROP FOREIGN KEY \`FK_d989ccc1bae14f77d4c728b9d63\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` DROP FOREIGN KEY \`FK_bf64cb1bb965b24b4b8e1b71b68\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_90fbbf944326dfaea5586bc922\` ON \`related_problem\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5f607f8f83b7d4be18df1ec5cb\` ON \`related_problem\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_bf64cb1bb965b24b4b8e1b71b6\` ON \`solution\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updated_at\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updated_at\` datetime(0) NULL DEFAULT 'now()'`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`created_at\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`created_at\` datetime(0) NULL DEFAULT 'now()'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`updated_at\` datetime(0) NULL DEFAULT 'now()'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`created_at\` datetime(0) NULL DEFAULT 'now()'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` CHANGE \`title\` \`title\` varchar(255) NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    await queryRunner.query(
      `ALTER TABLE \`solution\` DROP INDEX \`IDX_bf64cb1bb965b24b4b8e1b71b6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` DROP COLUMN \`problem_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` DROP COLUMN \`answer_config\``,
    );
    await queryRunner.query(`ALTER TABLE \`problem\` DROP COLUMN \`tags\``);
    await queryRunner.query(
      `ALTER TABLE \`problem\` DROP COLUMN \`required_fields\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD \`config_info\` json NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`solution\` ADD \`config_type\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`estimated_time\` int NULL COMMENT '예상 소요 시간(분)'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`difficulty\` enum ('beginner', 'intermediate', 'advanced') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`service_type\` varchar(50) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD \`solution_id\` int NULL`,
    );
    await queryRunner.query(`DROP TABLE \`cookbook_problem\``);
    await queryRunner.query(`DROP TABLE \`cookbook\``);
    await queryRunner.query(
      `CREATE INDEX \`related_problem_id\` ON \`related_problem\` (\`related_problem_id\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`email\` ON \`user\` (\`email\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`solution_id\` ON \`problem\` (\`solution_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`related_problem\` ADD CONSTRAINT \`related_problem_ibfk_2\` FOREIGN KEY (\`related_problem_id\`) REFERENCES \`problem\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`related_problem\` ADD CONSTRAINT \`related_problem_ibfk_1\` FOREIGN KEY (\`problem_id\`) REFERENCES \`problem\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`problem\` ADD CONSTRAINT \`problem_ibfk_1\` FOREIGN KEY (\`solution_id\`) REFERENCES \`solution\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
