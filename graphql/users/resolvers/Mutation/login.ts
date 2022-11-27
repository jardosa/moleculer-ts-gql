import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import LoginPayload from "../../entities/LoginPayload";
import { GQLContext } from "../../../base/types";

@Resolver()
export default class {
    @Mutation(() => LoginPayload)
    async login(
        @Arg("email", () => String) email: string,
        @Arg("password", () => String) password: string,
        @Ctx() ctx: GQLContext
    ): Promise<LoginPayload> {
        return ctx.moleculerBroker.call<LoginPayload, { email: string; password: string }>("users.login", { email, password });
    }
}
