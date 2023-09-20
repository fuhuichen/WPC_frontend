/**
 *
 */
export interface IUser {
    sessionId: string;
    user: {
        objectId: string;
        roles: {
            objectId: string;
            name: string;
        }[];
        username: string;
        name: string;
        email: string;
    };
}
