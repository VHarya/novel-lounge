export interface Transaction {
    readonly id:string,
    user:string,
    coins:number,
    price:number,
    status:string,
    snapToken:string,
    created:Date,
    expand:any,
}