import { Field, ObjectType } from "@nestjs/graphql";
import { Event } from "src/events/event.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class User{

    // constructor(partial?: Partial<User>){
    //     Object.assign(this,partial);
    // }

    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    email: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field(() => [Event])
    @OneToMany(() => Event, (event) => event.users)
    event?: Promise<Event[]>
}