import type { Novel } from "./novel";

export interface Chapter {
    readonly id:string;
    volumeNumber:number;
    chapterNumber:number;
    title:string;
    novel:any|Novel;
    created:string|Date;
    expand:any|Object;
}