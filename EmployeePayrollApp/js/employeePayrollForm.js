let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector("#name");
    name.addEventListener("input", function () {
        if (name.value.length == 0) {
            setTextValue('.name-error', "");
            return;
        }
        try {
           checkName(name.value);
            setTextValue('.name-error', "");
        } catch (error) {
            setTextValue('.name-error', error);
        }
    });
    const date = document.querySelector(".startDate");
    date.addEventListener("input", function () {
        const startDate = new Date(getInputValueById("#year") + " " + getInputValueById("#month") + " " + getInputValueById("#day"));
        try {
            checkStartDate(startDate);
            setTextValue('.date-error', "");
        } catch (error) {
            setTextValue('.date-error', error);
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
});

const save = () => {
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
    } catch (error) {
        return;
    }
}

const setEmployeePayrollObject = () => {
    if(!isUpdate) employeePayrollObj.id = createNewEmployeeId();
    employeePayrollObj._name = getInputValueById("#name");
    employeePayrollObj._profilePic = getSelectedValues("[name = profile]").pop();
    employeePayrollObj._gender = getSelectedValues("[name = gender]").pop();
    employeePayrollObj._department = getSelectedValues("[name = department]");
    employeePayrollObj._salary = getInputValueById("#salary");
    employeePayrollObj._notes = getInputValueById("#notes");
    employeePayrollObj._startDate = new Date(getInputValueById("#year") + " " + getInputValueById("#month") + " " + getInputValueById("#day"));
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let employeePayrollData = employeePayrollList.find(emp => emp.id == employeePayrollObj.id);
        if (!employeePayrollData) {
            employeePayrollList.push(employeePayrollObj);
        } else {
            const index = employeePayrollList.map(emp => emp.id).indexOf(employeePayrollObj);
            employeePayrollList.splice(index, 1, employeePayrollObj);
        }
    }
    else {
        employeePayrollList = [employeePayrollObj];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const getSelectedValues = (property) => {
    let allItems = document.querySelectorAll(property);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selectedItems.push(item.value);
    });
    return selectedItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const resetForm = () => {
    setValue("#name", "");
    setValue("#salary", "");
    setTextValue(".salary-output", getInputValueById("#salary"));
    setValue("#notes", "");
    setValue("#day", "1");
    setValue("#month", "January");
    setValue("#year", "2020");
    unsetSelectedValues("[name = profile]");
    unsetSelectedValues("[name = gender]");
    unsetSelectedValues("[name = department]");
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._notes);
    let date = formatDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value == value)
            item.checked = true;
    });
}