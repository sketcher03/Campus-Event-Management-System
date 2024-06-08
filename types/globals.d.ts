export { };
    
export type Roles = "admin" | "organizer" | "student" | "faculty" | "staff";

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles;
        };
    }
}