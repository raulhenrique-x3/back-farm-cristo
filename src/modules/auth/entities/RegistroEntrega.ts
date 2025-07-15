import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Person } from './Person';
import { Product } from './Product';
import { Farmaceutico } from './Farmaceutico';

@Entity()
export class RegistroEntrega {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Person, { onDelete: 'CASCADE' })
    person: Person;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    product: Product;

    @ManyToOne(() => Farmaceutico, { onDelete: 'CASCADE' })
    farmaceutico: Farmaceutico;

    @Column({ type: 'date' })
    data_entrega: string;

    @Column('int')
    quantidade: number;

    @Column({ nullable: true })
    observacoes: string;
}
