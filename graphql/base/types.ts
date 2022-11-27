import { ServiceBroker } from "moleculer";


export interface GQLContext {
    moleculerBroker: ServiceBroker;
    meta: {
        token: string;
    };
}

export interface JWTPayload {
    i: string;
    e: string;
    role?: string;
}
