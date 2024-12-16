import type { Category } from "./category";
import type { User } from "./user";

export interface Novel {
    readonly id:string;
    title:string;
    synopsis:string;
    author:any|User;
    categories:any[]|Category;
    cover:string;
    created:Date|string;
    expand:any|Object|null;
}