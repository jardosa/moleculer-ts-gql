/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { GraphQLSchema } from "graphql";
import "reflect-metadata";
import { buildSchema, buildSchemaSync } from "type-graphql";
import baseResolvers from "./base/resolvers";
import userResolvers from "./users/resolvers";

export default function buildGqlSchema(): GraphQLSchema {
	const resolvers = [...baseResolvers, ...userResolvers];

	const gqlSchema = buildSchemaSync({
		resolvers: [, ...resolvers],
	});

	return gqlSchema;
}
