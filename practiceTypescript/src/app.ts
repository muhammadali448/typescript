// Property getters and setters example
interface Invoice {
  id: string;
  clientId: number;
}
class FranchiseeAccountancyTool {
  private _invoice!: Invoice;
  constructor(public accToolKey: string, public taxRate: string) {}
  get invoice() {
    if (typeof this._invoice === "undefined") {
      throw new Error("Invoice not set");
    }
    return this._invoice;
  }
  set invoice(inv: Invoice) {
    this._invoice = inv;
  }
}
var consultancyInv = { id: "INV_20_12072015", clientId: 234 };
var accToolInstance = new FranchiseeAccountancyTool(
  "cnaj837tjdhsu#jd9_fd8",
  "201"
);
accToolInstance.invoice = consultancyInv;
console.log(accToolInstance.invoice);

// Create an interface describing stock item
// - allow to get and set it within warehouse location (make it as a class)
// - make new slot in warehouse and put there new stock item object
interface Stock {
  name: string;
  investment: number;
}

class WarehouseLocation {
  private _stock!: Stock;
  constructor(public address: string, public squareFeet: number) {}
  get stock() {
    if (typeof this._stock === "undefined") {
      throw new Error("Stock not set");
    }
    return this._stock;
  }
  set stock(stock: Stock) {
    this._stock = stock;
  }
}
var stockData = { name: "Samsung 860 evo", investment: 100000 };
var warehouse_1 = new WarehouseLocation("Gulishan-e-Iqbal Near nipa", 2500);
warehouse_1.stock = stockData;
console.log(warehouse_1.stock);

class Song_1 {
  constructor(
    private title: string,
    private artist: string,
    private year: number
  ) {}
  printInfo() {
    console.log(
      `Title: ${this.title}, Artist: ${this.artist}, Year: ${this.year}`
    );
  }
}
