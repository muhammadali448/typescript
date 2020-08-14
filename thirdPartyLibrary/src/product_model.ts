import { IsPositive, IsNumber, IsNotEmpty } from "class-validator";
export class Product {
    @IsNotEmpty()
    title: string
    @IsNumber()
    @IsPositive()
    price: number
    constructor(t: string, p: number) {
        this.price = p;
        this.title = t;
    }

    public get getInformation(): [string, string] {
        return [this.title, `$${this.price}`];
    }

}