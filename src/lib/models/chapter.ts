import type { Novel } from "./novel";

export interface Chapter {
    readonly id:string;
    chapter:number;
    title:string;
    novel:string;
    created:string|Date;
    price:number;
    expand:any|Object;
}