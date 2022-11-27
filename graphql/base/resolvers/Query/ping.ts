import { Context } from "moleculer";

import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export default class {
	@Query(() => String)
	async ping(@Ctx() ctx: Context): Promise<string> {
		return ctx.call<string>("greeter.ping");
	}
}
