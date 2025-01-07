export interface User {
    readonly id:string;
    username:string;
    firstName:string;
    lastName:string;
    avatar:string;
    balance:string;
    created:Date|string;
}