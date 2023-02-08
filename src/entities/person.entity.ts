import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    firstname: string;

    @Column({type: 'varchar'})
    lastname: string;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'varchar'})
    password: string;
}  