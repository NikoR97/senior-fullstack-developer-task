import { MigrationInterface, QueryRunner } from "typeorm";

export class ConvertRoleToRolesArray1751817013793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                ALTER TABLE users ADD COLUMN roles TEXT DEFAULT '[]'
            `);

            await queryRunner.query(`
                UPDATE users 
                SET roles = json_array(role) 
                WHERE role IS NOT NULL
            `);

            await queryRunner.query(`
                ALTER TABLE users DROP COLUMN role
            `);

            console.log('Successfully converted role to roles array');
        } catch (error) {
            console.error('Migration up error:', error);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
                ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'User'
            `);

            await queryRunner.query(`
                UPDATE users 
                SET role = json_extract(roles, '$[0]')
                WHERE roles IS NOT NULL AND json_array_length(roles) > 0
            `);

            await queryRunner.query(`
                ALTER TABLE users DROP COLUMN roles
            `);

            console.log('Successfully reverted roles array to single role');
        } catch (error) {
            console.error('Migration down error:', error);
            throw error;
        }
    }

}
