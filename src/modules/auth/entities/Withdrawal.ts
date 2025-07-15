import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { Person } from "./Person";
import { Product } from "./Product";

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, { eager: true })
  person: Person;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: "int" })
  quantity: number;

  @CreateDateColumn()
  withdrawnAt: Date;
}
