/* eslint-disable no-underscore-dangle */
import bcrypt from "bcrypt";
import DbService from "moleculer-db";
import { Context, Service, ServiceBroker } from "moleculer";
import MongooseDbAdapter from "moleculer-db-adapter-mongoose";
import jwt from "jsonwebtoken";
import {
	moleculerGql as gql,
	UserInputError,
	ForbiddenError,
} from "moleculer-apollo-server";
import { format, addDays } from "date-fns";
import MUser from "../models/user.model";
import hashPassword from "../utils/hashPassword";
import { UserInterface } from "./../models/user.model";

class UsersService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "users",
			adapter: new MongooseDbAdapter(
				"mongodb://localhost/moleculer-graphql",
				{
					useUnifiedTopology: true,
				}
			),
			collection: "users",
			mixins: [DbService],
			model: MUser,
			settings: {
				graphql: {
					type: gql`
						"""
						This type describes the user entity
						"""
						scalar DateTime

						interface Node {
							_id: ID!
						}

						interface Timestamp {
							createdAt: DateTime
							updatedAt: DateTime
						}

						type User implements Node & Timestamp {
							_id: ID!
							username: String!
							fullName: String!
							email: String!
							author: Boolean!
							createdAt: DateTime
							updatedAt: DateTime
						}

						type LoginPayload {
							authToken: String!
							profile: User!
						}

						input RegisterInput {
							username: String!
							fullName: String!
							email: String!
							password: String!
							author: Boolean!
							avatar: String
						}
					`,
				},
			},
			actions: {
				register: {
					params: {
						input: "object",
					},
					graphql: {
						mutation:
							// "register(username: String, fullName: String, email: String, password: String, author: Boolean): LoginPayload",
							"register(input: RegisterInput!): LoginPayload",
					},
					handler: this.registerUser,
				},
				login: {
					params: {
						email: "string",
						password: "string",
					},
					graphql: {
						mutation:
							"login(email: String, password: String): LoginPayload",
					},
					handler: this.login,
				},
			},
		});
	}

	public async login(ctx: Context<{ email: string; password: string }>) {
		const user = await this.adapter.findOne({
			email: ctx.params.email,
		});

		if (!user) {
			throw new UserInputError("Invalid login credentials");
		}

		const isMatched = await bcrypt.compare(
			ctx.params.password,
			user.password
		);

		if (!isMatched) {
			throw new ForbiddenError("Invalid login credentials.");
		}

		const expiresAt = format(
			addDays(new Date(), +process.env.JWT_EXPIRATION),
			"yyyy-MM-dd HH:mm:ss"
		);
		const authToken = jwt.sign(
			{ i: user._id.toString(), r: user.role, e: expiresAt },
			process.env.JWT_EXPIRATION
		);

		return {
			authToken,
			profile: user,
		};
	}
	public async registerUser(ctx: Context<{ input: UserInterface }>) {
		const {
			input: { fullName, username, email, password, avatar, author },
		} = ctx.params;
		// Check Email if exists
		const doc = await this.adapter.find({
			query: {
				$or: [{ email }, { username }],
			},
		});

		if (doc.length > 0) {
			throw new UserInputError(
				"Email Address/Username has already been taken"
			);
		}

		const result = await this.adapter.insert({
			...ctx.params.input,
			password: await hashPassword(password),
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

module.exports = UsersService;
