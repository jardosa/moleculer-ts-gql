import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export default abstract class TimeStamps {
	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
