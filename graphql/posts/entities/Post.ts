import { Field, ObjectType } from "type-graphql";
import Node from "../../base/entities/Node";
import User from "../../users/entities/User";


@ObjectType({ implements: Node })
export default class Post extends Node {
    @Field()
    title: string;
    @Field()
    content: string;
    @Field()
    author: User;
    @Field()
    isPublished: boolean;
}
