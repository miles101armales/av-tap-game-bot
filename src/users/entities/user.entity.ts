import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  id: number;

  @Column({ nullable: true, default: 'NONAME' })
  first_name: string;

  @Column({ nullable: true, default: 'NONAME' })
  last_name: string;

  @Column({ nullable: true, default: 'NONAME' })
  username: string;

  @Column()
  language_code: string;

  @Column({ nullable: true, default: false })
  is_premium: boolean;

  @Column({ nullable: true, default: false })
  allows_write_to_pm: boolean;

  @Column({ nullable: true, default: 0 })
  score: number;
}
