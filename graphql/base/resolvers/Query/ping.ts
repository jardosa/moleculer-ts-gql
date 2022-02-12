import { Context } from "moleculer";
/* eslint-disable class-methods-use-this */

import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export default class {
	@Query(() => String)
	ping(@Ctx() ctx: Context): string {
		return "pong";
	}
}
