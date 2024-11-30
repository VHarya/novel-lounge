import type { Category } from "./category";
import type { User } from "./user";

export interface Novel {
    readonly id:string;
    title:string;
    author:any|User;
    categories:any|Category;
    created:string|Date;
    expand:any|Object|null;
}