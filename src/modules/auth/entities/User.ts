import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Produto } from './Produto';

@Entity()
export class Idoso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'date' })
    data_nascimento: string;

    @Column('float')
    peso: number;

    @Column()
    nome_mae: string;

    @Column({ unique: true })
    cpf: string;

    @Column({ default: false })
    obito: boolean;

    @ManyToMany(() => Produto, (produto) => produto.idosos)
    @JoinTable({
        name: 'idoso_remedio',
        joinColumn: { name: 'idoso_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'produto_id', referencedColumnName: 'id' }
    })
    remedio: Produto[];
}
