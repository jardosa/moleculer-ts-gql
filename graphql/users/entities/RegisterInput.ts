import { Field, InputType, ObjectType } from "type-graphql";
import Node from "../../base/entities/Node";
import TimeStamps from "../../base/entities/TimeStamps";

@InputType()
export default class RegisterInput {
	@Field()
	email: string;

	@Field()
	username: string;

	@Field()
	password: string;

	@Field()
	fullName: string;

	@Field({ nullable: true })
	author?: boolean;
}
