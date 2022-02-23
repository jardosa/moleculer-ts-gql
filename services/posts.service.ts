import DbService from "moleculer-db";
import MongooseDbAdapter from "moleculer-db-adapter-mongoose";
import { Context, Service, ServiceBroker } from "moleculer";
import { moleculerGql as gql } from "moleculer-apollo-server";
import MPost, { PostInterface } from "../models/posts.model";
export default class PostsService extends Service {
    public constructor(broker: ServiceBroker) {
        super(broker);
        this.parseServiceSchema({
            name: "posts",
            adapter: new MongooseDbAdapter<PostInterface>("mongodb://localhost/moleculer-graphql", {
                useUnifiedTopology: true,

            }),
            collection: "posts",
            mixins: [DbService],
            model: MPost,
            settings: {
                graphql: {
                    type: gql`
                        """
                        This type describes the post entity
                        """
    
                        type Post implements Node & Timestamp {
                            _id: ID!
                            title: String!
                            content: String!
                            author: User!
                            isPublished: Boolean!
                            createdAt: DateTime
                            updatedAt: DateTime
                        }

                        input CreatePostInput {
                            title: String!
                            content: String!
                            author: ID!
                            isPublished: Boolean!
                        }
                    `,
                    resolvers: {
                        Post: {
                            author: {
                                action: "users.resolve",
                                rootParams: {
                                    author: "_id",
                                },
                            },
                        },
                    },
                },
            },
            actions: {
                create: {
                    params: {
                        input: "object",
                    },
                    graphql: {
                        mutation: "createPost(input: CreatePostInput!):Post",
                    },
                    handler: this.createPost,
                },
                findPostById: {
                    params: {
                        _id: "string",

                    },
                    graphql: {
                        query: "findPostById(_id: String!):Post",
                    },
                    handler: this.findPostById,
                },

            },

        });
    }

    public async createPost(ctx: Context<{ input: PostInterface }>) {
        const { input: {
            title, content, isPublished, author,
        } } = ctx.params;


        const doc = await this.adapter.insert({
            title,
            content,
            isPublished,
            author,
        });

        return doc;
    }

    public async findPostById(ctx: Context<{ _id: string }>) {
        const postDoc = await this.adapter.findById(ctx.params._id);

        return postDoc;
    }
}
