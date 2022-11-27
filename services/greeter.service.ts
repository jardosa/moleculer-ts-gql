import { Context, Service, ServiceBroker } from "moleculer";

class GreeterService extends Service {
	public constructor(broker: ServiceBroker) {
		super(broker);

		this.parseServiceSchema({
			name: "greeter",
			actions: {
				ping: {
					handler: () => {
						broker.emit("ping.called");
						return "pong called from greeter service!";
					},
				},
				echo: {
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
			events: {
				"user.created": (ctx: Context) => {
					console.log(`User ${ctx.params} has been created`);
				},
				"user.logged": (ctx: Context) => {
					console.log(
						`User ${ctx.params} has logged in`,
					);
				},
				"ping.called": () => {
					console.log("Ping has been called");
				},
			},
		});
	}
}

module.exports = GreeterService;
