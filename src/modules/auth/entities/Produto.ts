import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Idoso } from './Idoso';

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column('int')
    quantidade: number;

    @Column({  })
    categoria: "remedio" | "produto";

    @ManyToMany(() => Idoso, (idoso) => idoso.remedio)
    idosos: Idoso[];
}
