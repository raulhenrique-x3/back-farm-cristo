import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Idoso } from './Idoso';

export enum CategoriaProduto {
  Produto = 'Produto',
  Remedio = 'Remedio'
}


@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column('int')
    quantidade: number;

    @Column({ default: false })
    necessidade: boolean; // true = sim, false = não

    @Column({ type: 'enum', enum: CategoriaProduto })
    categoria: CategoriaProduto;

    @ManyToMany(() => Idoso, (idoso) => idoso.remedio)
    idosos: Idoso[];
}
