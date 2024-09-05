import { Role } from "./role";
export interface RegisterRequest {
    firstname?: string;
    lastname?: string;
    email?: string;
    passwd?: string;
    numphone?: string;
    roles: Role[];
    mfaEnabled?: string;}