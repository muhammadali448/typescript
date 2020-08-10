console.log("Learning Decorators");

// function logger(constructor: Function) {
//     console.log("Logger...");
//     console.log(constructor);
// }
// function Logger(logString: string) {
//     return function (constructor: Function) {
//         console.log(logString);
//         console.log(constructor);
//     }
// }

function withTemplate(template: string, hookId: string) {
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                const el = document.getElementById(hookId);
                if (el) {
                    el.innerHTML = template;
                    // const p = new originalConstructor(); there is no need of it
                    document.querySelector("p")!.textContent = this.name;
                }
            }
        }
    }
}


// @Logger("PERSON-----LOGGER")
@withTemplate("<p>Logger Person</p>", "app")
class Person {
    name = "ali";
    constructor() {
        console.log("creating person object");
    }
}

const p1 = new Person();
p1.name = "ahad"
console.log(p1);

function log(target: any, propertyName: string | Symbol) {
    console.log("Property-Decorator");
    console.log(target, propertyName);
}

function log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("Method");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameter Decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @log
    title: string;
    private _price: number;
    constructor(title: string, price: number) {
        this._price = price;
        this.title = title;
    }
    @log2
    public set setTitle(v: string) {
        this.title = v;
    }

    public set setPrice(v: number) {
        if (v > 0) {
            this._price = v;
        }
        else {
            throw new Error("Invalid price")
        }
    }

    public get getTitle(): string {
        return this.title
    }

    public get getPrice(): number {
        return this._price
    }

    @log3
    getPriceWithTax(@log4 tax: number) {
        return tax * (this._price + 1);
    }

}