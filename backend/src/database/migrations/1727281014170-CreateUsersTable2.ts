import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable21727281014170 implements MigrationInterface {
    name = 'CreateUsersTable21727281014170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`email\` ON \`registers\``);
        await queryRunner.query(`ALTER TABLE \`registers\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`registers\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registers\` DROP COLUMN \`pass\``);
        await queryRunner.query(`ALTER TABLE \`registers\` ADD \`pass\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`registers\` DROP COLUMN \`pass\``);
        await queryRunner.query(`ALTER TABLE \`registers\` ADD \`pass\` varchar(8) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`registers\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`registers\` ADD \`email\` varchar(40) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`email\` ON \`registers\` (\`email\`)`);
    }

}
