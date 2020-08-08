abstract class Department {
    // private name: string;
    protected employees: string[] = [];
    static employeePay: number = 2000;
    // constructor(n: string) {
    //     this.name = n;
    // }
    constructor(protected readonly id: string, private name: string) {

    }
    public get getName(): string {
        return this.name
    }
    public get getId(): string {
        return this.id
    }
    public addEmployee(name: string) {
        // this.id = "d2";
        this.employees.push(name);
    }

    static employeeStatus(): string {
        return "Junior";
    }

    public get getEmployees(): string[] {
        return this.employees;
    }

    // describe(this: Department) {
    //     console.log("Undefined: ", this.name);
    // }
    abstract describe(this: Department): void;
}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, "IT");
        this.admins = admins;
    }
    describe(this: ITDepartment) {
        console.log("ITDepartment ID: ", this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;
    // constructor(id: string, private reports: string[]) {
    //     super(id, "Accounting");
    //     this.lastReport = reports[0];
    // }
    private constructor(id: string, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }

    describe(this: AccountingDepartment) {
        console.log("AccountingDepartment ID: ", this.id);
    }
    public addReport(reportName: string) {
        this.reports.push(reportName);
        this.lastReport = reportName;
    }
    public get getReports(): string[] {
        return this.reports
    }

    public set setLastReport(v: string) {
        this.addReport(v);
    }

    public get getLastReport(): string {
        if (!this.lastReport) {
            throw new Error("No report exist");
        }
        return this.lastReport;
    }

    addEmployee(name: string) {
        if (name === "Reshail Khan") {
            return;
        }
        this.employees.push(name);
    }

}
// const department = new Department(); can't create an instance of department
// const accountingDepartment = new AccountingDepartment("d1", []);
const accountingDepartment = AccountingDepartment.getInstance();
accountingDepartment.describe();
// console.log("Last Report: ", accountingDepartment.getLastReport);
accountingDepartment.addReport("Fees Report");
accountingDepartment.addReport("Sports Funds Report");
console.log(`Department Name (id: ${accountingDepartment.getId}): `, accountingDepartment.getName);
accountingDepartment.addEmployee("Yasir Abbas");
accountingDepartment.addEmployee("Muhammad Ali");
accountingDepartment.addEmployee("Ahad");
accountingDepartment.addEmployee("Sufiyan");
accountingDepartment.addEmployee("Ahmed");
accountingDepartment.addEmployee("Reshail Khan"); // employee not added
console.log("All Employees income about: ", Department.employeePay);
console.log(`All employees are ${Department.employeeStatus()} level`);
console.log("Last Report: ", accountingDepartment.getLastReport);
accountingDepartment.setLastReport = "Check New Report";
accountingDepartment.addReport("Examination Fees Report");
console.log(`Total Employees in ${accountingDepartment.getName} Department(id: ${accountingDepartment.getId}): `, accountingDepartment.getEmployees.length);
console.log("Employees: ", accountingDepartment.getEmployees);
console.log("Reports: ", accountingDepartment.getReports);
// const accountingCpy = {
//     name: "ali",
//     describe: accounting.describe
// }
// accountingCpy.describe();
const idDepart = new ITDepartment("d2", ["Reshail Khan"]);
idDepart.describe();
idDepart.addEmployee("Arhama");
idDepart.addEmployee("Haseeb");
console.log(idDepart);