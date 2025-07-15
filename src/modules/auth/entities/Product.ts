import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { Person } from "./Person";

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

  @ManyToMany(() => Person, (person) => person.receivedProducts)
  receivedBy: Person[];

  @ManyToMany(() => Person, (person) => person.donatedProducts)
  donatedBy: Person[];
}
