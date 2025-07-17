import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pharmaceutical {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  role: boolean;
}
