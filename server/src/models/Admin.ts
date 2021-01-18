import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('admin')
export default class Admin {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user: string;

  @Column()
  password: string;
}