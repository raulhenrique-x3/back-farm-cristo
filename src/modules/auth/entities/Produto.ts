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

    @Column({ default: false })
    necessidade: boolean; // true = sim, false = não

    @Column({ type: 'varchar' })
    categoria: 'Produto' | 'Remedio';

    @ManyToMany(() => Idoso, (idoso) => idoso.remedio)
    idosos: Idoso[];
}
