import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-express";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Context } from "moleculer";
import MUser from "../../../../models/user.model";
import hashPassword from "../../../../utils/hashPassword";
import LoginPayload from "../../entities/LoginPayload";
import RegisterInput from "../../entities/RegisterInput";

@Resolver()
export default class {
	@Mutation(() => LoginPayload)
	async register(
		@Arg("input", () => RegisterInput) input: RegisterInput,
		@Ctx() ctx: Context<RegisterInput>
	): Promise<LoginPayload> {
		const user = await MUser.findOne({
			$or: [{ email: input.email, username: input.username }],
		});

		if (user) {
			throw new UserInputError(
				"Email Address/Username has already been taken"
			);
		}

		const result = await MUser.create({
			...input,
			password: await hashPassword(input.password),
		});
		const authToken = jwt.sign(
			{ i: result._id.toString() },
			process.env.JWT_SECRET
		);

		return {
			authToken,
			profile: result,
		};
	}
}
