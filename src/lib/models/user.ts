export interface User {
    readonly id:string;
    username:string;
    firstName:string;
    lastName:string;
    profilePicture:string;
    created:Date|string;
}