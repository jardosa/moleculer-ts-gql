import { Field, InputType, ObjectType } from "type-graphql";
import Node from "../../base/entities/Node";
import TimeStamps from "../../base/entities/TimeStamps";

@ObjectType({ implements: [Node, TimeStamps], isAbstract: true })
export default class User {
	@Field()
	username: string;

	@Field()
	fullName: string;

	@Field()
	email: string;

	@Field({ nullable: true })
	author?: boolean;
}
