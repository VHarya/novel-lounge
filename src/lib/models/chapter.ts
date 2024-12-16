import type { Novel } from "./novel";

export interface Chapter {
    readonly id:string;
    volumeNumber:number;
    chapterNumber:number;
    chapterTitle:string;
    novel:any|Novel;
    created:string|Date;
    price:number;
    expand:any|Object;
}