import { Ingredient } from "./ingredient.model";
import { RegisterComponent } from '../register/register.component';

export class User {
    id:number;
    public firstName:string;
    public lastName:string;
    public email:string;
    public password:string;
    public token: string;
}