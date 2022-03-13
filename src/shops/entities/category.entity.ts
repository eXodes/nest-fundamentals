import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Shop, (shop) => shop.categories)
  shops: Shop[];
}
