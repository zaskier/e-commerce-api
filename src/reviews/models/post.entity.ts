import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('review-post')
export class ReviewPostEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    body: string;

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP' })
    createdAt : Date;

}