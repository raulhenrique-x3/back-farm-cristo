import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "../../user/entities/User";
import { Product } from "./Product";

@Entity()
export class Withdrawal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ type: "int" })
  quantity: number;

  @CreateDateColumn()
  withdrawnAt: Date;
}
