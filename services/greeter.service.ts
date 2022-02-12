import { Context, Service, ServiceBroker } from "moleculer";

class GreeterService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "greeter",
			actions: {
				ping: {
					graphql: {
						query: "ping: String",
					},
					handler: () => "pong!",
				},
				echo: {
					graphql: {
						params: {
							str: "string",
						},
						mutation: "echo(str: String!): String",
					},
					handler: (ctx: Context<{ str: string }>) => ctx.params.str,
				},
				hello: {
					graphql: {
						query: "hello: String",
					},
					handler: () => "Hello Moleculer!",
				},
				welcome: {
					params: {
						name: "string",
					},
					graphql: {
						mutation: "welcome(name: String!): String",
					},
					handler: (ctx: Context<{ name: string }>) =>
						`Hello ${ctx.params.name}`,
				},
			},
		});
	}
}

module.exports = GreeterService;
