import { Types, Schema, Document, model } from "mongoose";

export interface PostInterface extends Document {
    title: string;
    content: string;
    author: Types.ObjectId;
    isPublished: boolean;
}

const PostSchema = new Schema({

    title: { type: String, required: "Please fill in a title" },
    content: { type: String, required: "Content required" },
    author: Types.ObjectId,
    isPublished: { default: false, type: Boolean },
}, {
    timestamps: true,
});

const MPost = model<PostInterface>("Post", PostSchema);

export default MPost;


