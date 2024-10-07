import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('registers')
export class Registers {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    pass: string
}