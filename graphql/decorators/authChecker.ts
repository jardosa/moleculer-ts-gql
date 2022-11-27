import { format } from "date-fns";
import jwt from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import { GQLContext, JWTPayload } from "./../base/types";

export const authChecker: AuthChecker<GQLContext> = (
    { root, args, context, info },
    roles,
) => {
    if (!context?.meta?.token) { return false; }

    const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const jwtVERIFY = jwt.verify(context.meta.token.replace("Bearer ", ""), process.env.JWT_SECRET) as JWTPayload;
    if (now > jwtVERIFY.e) {
        return false;
    }
    const user = context.moleculerBroker.call("users.findUserById", { _id: jwtVERIFY.i });

    if (!user) { return false; }
    return true;
};
// Here we can read the user from context
// And check his permission in the db against the `roles` argument
// That comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

// True // Or false if access is denied
;

