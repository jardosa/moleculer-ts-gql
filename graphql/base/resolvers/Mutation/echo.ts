
import { Resolver, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import { GQLContext } from "../../types";

@Resolver()
export default class {
	@Authorized()
	@Mutation(() => String)
	echo(
		@Arg("str") str: string,
		@Ctx() ctx: GQLContext
	): string {
		return `${str}`;
	}
}
