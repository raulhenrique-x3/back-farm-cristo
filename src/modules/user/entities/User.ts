import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Product } from "../../auth/entities/Product";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthDate: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: "varchar" })
  type: "elderly" | "donor";

  @ManyToMany(() => Product, (product) => product.receivedBy)
  @JoinTable({
    name: "user_received_product",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
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
