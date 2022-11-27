
import { GraphQLSchema } from "graphql";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import baseResolvers from "./base/resolvers";
import { authChecker } from "./decorators/authChecker";
import userResolvers from "./users/resolvers";

const buildGqlSchema: () => GraphQLSchema = () => {
	const resolvers = [...baseResolvers, ...userResolvers];

	const gqlSchema = buildSchemaSync({
		resolvers: [, ...resolvers],
		authChecker,
	});

	return gqlSchema;
};


export default buildGqlSchema;
