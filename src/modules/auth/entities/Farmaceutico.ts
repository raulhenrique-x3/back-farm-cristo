import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Farmaceutico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    senha: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column()
    role: boolean;

}
