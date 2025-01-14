import type { RecordModel } from "pocketbase";

export interface User extends RecordModel {
    readonly id:string;
    username:string;
    firstName:string;
    lastName:string;
    avatar:string;
    balance:string;
    created:Date|string;
}