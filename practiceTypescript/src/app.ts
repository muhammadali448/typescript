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

// Binary Operators