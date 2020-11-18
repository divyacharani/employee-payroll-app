{
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
}

class EmployeePayRollData {

    get name() { return this._name; }
    set name(name) {
        this._name = name;
    }
    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) { this._profilePic = profilePic; }

    get salary() { return this._salary; }
    set salary(salary) {
        this._salary = salary;
    }
    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }
    get department() { return this._department; }
    set department(department) { this._department = department; }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    get notes() { return this._notes; }
    set notes(notes) {
        this._notes = notes;
    }

    toString() {
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric'
        };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-IN", options);
        return "name = " + this.name + ", profilePic = " + this.profilePic + ", salary = " + this.salary + ", gender = " + this.gender + ", department = " + this.department + ", startDate = " + empDate+ ", notes= " + this.notes;
    }
}

function save() {
    let employeePayrollData = new EmployeePayRollData();
    employeePayrollData.name = getInputValueById("#name");
    employeePayrollData.profilePic = getSelectedValues("[name = profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name = gender]").pop();
    employeePayrollData.department = getSelectedValues("[name = department]");
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.notes = getInputValueById("#notes");
   employeePayrollData.startDate = new Date(getInputValueById("#year"), getInputValueById("#month"), getInputValueById("#day"));
   alert(employeePayrollData.toString());
}

let getSelectedValues = (property) => {
    let allItems = document.querySelectorAll(property);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selectedItems.push(item.value);
    });
    return selectedItems;
}

let getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}