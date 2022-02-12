import { Field, ObjectType } from "type-graphql";
import User from "./User";

@ObjectType()
export default class LoginPayload {
	@Field()
	authToken: string;

	@Field(() => User)
	profile: User;
}
