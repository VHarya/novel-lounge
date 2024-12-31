export interface Transaction {
    readonly id:string,
    coins:number,
    price:number,
    status:string,
    snapToken:string,
    created:Date,
}