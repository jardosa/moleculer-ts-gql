import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "moleculer";
import LoginPayload from "../../entities/LoginPayload";
import RegisterInput from "../../entities/RegisterInput";

@Resolver()
export default class {
	@Mutation(() => LoginPayload)
	async register(
		@Arg("input", () => RegisterInput) input: RegisterInput,
		@Ctx() ctx: Context<RegisterInput>
	): Promise<LoginPayload> {
		return ctx.call<LoginPayload, {input: RegisterInput}>("users.register", {input});
	}
}
