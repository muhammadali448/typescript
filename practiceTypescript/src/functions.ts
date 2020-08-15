enum FootSize {
    Small,
    Medium,
    Large,
    XL,
    XXL
}
let fsize1 = FootSize.Small;
++fsize1;
console.log(FootSize[fsize1]); // Medium
let fsize2 = FootSize.XL;
--fsize2;
console.log(FootSize[fsize2]); // Large
--fsize2;
--fsize2;
console.log(FootSize[fsize2]);
let fsize3 = FootSize.XXL;
++fsize3;
console.log(FootSize[fsize3]); // undefined
// Functions
// Example 1
function countAvr(x: number, y: number, z?: number): string {
    var tog = x; // 2,5
    var counter = 1;
    tog += y; // 2 + 8 = 10, 5 + 7 = 12
    counter++; // 2, 2
    if (typeof z !== 'undefined') {
        tog += z;
        counter++;
    }
    var avr = tog / counter; // 10 / 2 = 5
    return 'The average is ' + avr;
}
var res = countAvr(5, 7, 6); // 'The average is 5'
console.log(res);
// Example 2
function conc(i: string[], sep = ',', b = 0, e = i.length) {
    console.log(i, sep, b, e);
    var resu = '';
    for (var k = b; k < e; k++) {
        resu += i[k]; // D
        if (k < (e - 1)) { // 0, 1
            resu += sep; // D, E, F
        }
    }
    return resu;
}
var items = ['D', 'E', 'F'];
// 'D,E,F'
console.log(items)
var res = conc(items);
// 'E-F'
var partRes = conc(items, '-', 1);
console.log(partRes);
// Example 3
function countAvr1(...avr: number[]): string {
    var t = 0;
    var c = 0;

    for (var k = 0; k < avr.length; k++) {
        t += avr[k];
        c++;
    }

    var av = t / c;
    return 'The average is ' + av;
}
var res = countAvr1(1, 2, 3, 4, 5); // 'The average is 3'
console.log(res);

// Example 4
function countAvr2(x: string, y: string, z: string): string;
function countAvr2(x: number, y: number, z: number): string;
// implementation signature
function countAvr2(x: any, y: any, z: any): string {
    var t = parseInt(x, 10) + parseInt(y, 10) + parseInt(z, 10);
    var av = t / 3;
    return 'The average is ' + av;
}
var res = countAvr2(2, 4, 9); // 5
console.log(res);
var res2 = countAvr2("2", "6", "10");
console.log(res2);
