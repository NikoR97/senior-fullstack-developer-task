import { MigrationInterface, QueryRunner } from "typeorm";

export class ConvertStatusToEnum1751817402764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                ALTER TABLE users ADD COLUMN status_enum TEXT DEFAULT 'Enabled'
            `);

            await queryRunner.query(`
                UPDATE users 
                SET status_enum = CASE 
                    WHEN status = 1 THEN 'Enabled'
                    WHEN status = 0 THEN 'Disabled'
                    ELSE 'Enabled'
                END
            `);

            await queryRunner.query(`
                ALTER TABLE users DROP COLUMN status
            `);

            await queryRunner.query(`
                ALTER TABLE users RENAME COLUMN status_enum TO status
            `);

            console.log('Successfully converted boolean status to enum');
        } catch (error) {
            console.error('Migration up error:', error);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                ALTER TABLE users ADD COLUMN status_boolean INTEGER DEFAULT 1
            `);

            await queryRunner.query(`
                UPDATE users 
                SET status_boolean = CASE 
                    WHEN status = 'Enabled' THEN 1
                    WHEN status = 'Disabled' THEN 0
                    WHEN status = 'Deleted' THEN 0
                    ELSE 1
                END
            `);

            await queryRunner.query(`
                ALTER TABLE users DROP COLUMN status
            `);

            await queryRunner.query(`
                ALTER TABLE users RENAME COLUMN status_boolean TO status
            `);

            console.log('Successfully reverted enum status to boolean');
        } catch (error) {
            console.error('Migration down error:', error);
            throw error;
        }
    }

}
