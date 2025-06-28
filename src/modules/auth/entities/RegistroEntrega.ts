import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Idoso } from './Idoso';
import { Produto } from './Produto';
import { Farmaceutico } from './Farmaceutico';

@Entity()
export class RegistroEntrega {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Idoso, { onDelete: 'CASCADE' })
    idoso: Idoso;

    @ManyToOne(() => Produto, { onDelete: 'CASCADE' })
    produto: Produto;

    @ManyToOne(() => Farmaceutico, { onDelete: 'CASCADE' })
    farmaceutico: Farmaceutico;

    @Column({ type: 'date' })
    data_entrega: string;

    @Column('int')
    quantidade: number;

    @Column({ nullable: true })
    observacoes: string;
}
