function whoAmI<U>(param: U): U {
  return param;
}

let amIme: { <U, T>(arg: U, arg_1: T): U } = whoAmI;

const str_1 = whoAmI<string>("hello world");
console.log(str_1);
const str_2 = amIme<string, number>("hello world_2", 2);
console.log(str_2);

interface GenericWhoAmIFn {
  <B>(param: B): B;
}

function whoAmI_1<B>(param: B): B {
  return param;
}

let amIme_1: GenericWhoAmIFn = whoAmI_1;
console.log(amIme_1("Of course not, you're in the Matrix, Mate.."));

class GenericInvoice<C> {
  invoiceOwner!: C;
  send!: (invID: C, invType: C) => C;
}

let myInvoice = new GenericInvoice<string>();
myInvoice.invoiceOwner = "Judy";
myInvoice.send = function (invID, invType) {
  let invRemarks =
    invType + " invoice with number " + invID + " has been issued";
  return invRemarks;
};

console.log(
  myInvoice.send("12-23012018", "ProForma") + " by " + myInvoice.invoiceOwner
);
