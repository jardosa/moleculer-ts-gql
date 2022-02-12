import { Field, InterfaceType, Int } from "type-graphql";
import Node from "./Node";

@InterfaceType()
export default abstract class NodeConnection<T extends Node> {
	@Field(() => Int)
	totalCount: number;

	abstract nodes: T[];
}
