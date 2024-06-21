import { registerEnumType } from "@nestjs/graphql";

export enum EventStatus{
    ACCEPTED = 1,
    MAYBE,
    REJECTED,
}