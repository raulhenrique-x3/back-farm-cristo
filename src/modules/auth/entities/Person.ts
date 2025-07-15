import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthDate: string;

  @Column("float")
  weight: number;

  @Column()
  motherName: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: "varchar" })
  type: "Elderly" | "Donor";

  @ManyToMany(() => Product, (product) => product.receivedBy)
  @JoinTable({
    name: "person_received_product",
    joinColumn: { name: "person_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
  })
  receivedProducts: Product[];

  @ManyToMany(() => Product, (product) => product.donatedBy)
  @JoinTable({
    name: "person_donated_product",
    joinColumn: { name: "person_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "product_id", referencedColumnName: "id" },
  })
  donatedProducts: Product[];
}
