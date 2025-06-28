import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Farmaceutico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    cpf: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

}
