import { User } from "../models/user.model";


export interface ChargeUser {
    totalIndex: number;
    users: User[];
}