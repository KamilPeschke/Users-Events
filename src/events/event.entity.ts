import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventStatus } from "./events.status";
import { User } from "src/user/user.entity";

@Entity()
@ObjectType()
export class Event{

    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    description: string;

    @Field()
    status:EventStatus;

    @Field(() => [User], {nullable: true})
    @ManyToOne(() => User, (user) => user.event)
    users: User[];
}