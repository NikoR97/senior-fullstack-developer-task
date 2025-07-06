import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatus } from './user-status.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({
    type: 'text',
    default: '[]',
    transformer: {
      to: (value: string[]) => JSON.stringify(value || []),
      from: (value: string) => {
        try {
          return JSON.parse(value || '[]');
        } catch {
          return [];
        }
      }
    }
  })
  roles: string[];

  @Column({
    type: 'text',
    enum: UserStatus,
    default: UserStatus.ENABLED
  })
  status: UserStatus;
}
