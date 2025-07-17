import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { User } from "../../user/entities/User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ type: "varchar" })
  category: string; // "Product" or "Medicine"

  @CreateDateColumn()
  entryDate: Date;

  @ManyToMany(() => User, (user) => user.receivedProducts)
  receivedBy: User[];

  @ManyToMany(() => User, (user) => user.donatedProducts)
  donatedBy: User[];
}
