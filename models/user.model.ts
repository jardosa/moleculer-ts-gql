/* eslint-disable id-blacklist */
import { Schema, model, Document } from "mongoose";

export interface UserInterface extends Document {
	username: string;
	password: string;
	fullName: string;
	email: string;
	author: boolean;
	avatar?: string;
}

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			index: true,
			lowercase: true,
			required: "Please fill in a username",
			trim: true,
		},
		password: {
			type: String,
			required: "Please fill in a password",
		},
		fullName: {
			type: String,
			trim: true,
			default: "",
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			index: true,
			lowercase: true,
			required: "Please fill in an email",
		},
		author: {
			type: Boolean,
			default: false,
		},
		avatar: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

// Add full-text search index
UserSchema.index({
	// "$**": "text"
	fullName: "text",
	username: "text",
});

const MUser = model<UserInterface>("User", UserSchema);
export default MUser;
