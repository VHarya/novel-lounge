import type { RecordModel } from "pocketbase";

export interface Balance extends RecordModel {
    user:string,
    coins:number,
}