import 'reflect-metadata';
import { plainToClass } from "class-transformer";
import _ from "lodash";
import { Product } from "./product_model";
import { validate } from 'class-validator';
console.log(_.shuffle([1, 2, 3]));
declare var GLOBAL: string
console.log(GLOBAL);
const products = [{
    title: "Macbook Pro 16",
    price: 510000
}, {
    title: "Samsung 860 evo",
    price: 9500
}]
const p1 = new Product("", -5);
validate(p1).then(errors => {
    // errors is an array of validation errors
    if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);
    } else {
        console.log(p1.getInformation);
        console.log('validation succeed');
    }
});
const allProducts = plainToClass(Product, products);
// const allProducts = products.map(pr => new Product(pr.title, pr.price));
// const p1 = new Product("Macbook Pro 16", 510000);
// console.log(p1.getInformation);
for (const product of allProducts) {
    console.log(product.getInformation)
}