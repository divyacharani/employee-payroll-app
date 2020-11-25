let employeePayrollList;
window.addEventListener('DOMContentLoaded', () => {
    if (site_properties.use_local_storage.match("true"))
        getEmployeePayrollDataFromStorage();
    else
        getEmployeePayrollDataFromServer();
});

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromStorage = () => {
    employeePayrollList = localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true, null)
        .then(responseText => {
            console.log(responseText);
            employeePayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            employeePayrollList = [];
            processEmployeePayrollDataResponse();
        });
}

const createInnerHtml = () => {
    const headerHtml = `<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
    </tr>`;
    let innerHtml = `${headerHtml}`;
    if (employeePayrollList.length == 0) {
        document.querySelector('#table-display').innerHTML = innerHtml;
        return;
    }
    for (const employeePayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profilePic}"></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDeptHtml(employeePayrollData._department)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${formatDate(employeePayrollData._startDate)}</td>
            <td>
                <img id="${employeePayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img id="${employeePayrollData.id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
            </td>
    </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(emp => emp.id == node.id);
    if (!employeePayrollData) return;
    const index = employeePayrollList.map(emp => emp.id).indexOf(employeePayrollData.id);
    employeePayrollList.splice(index, 1);
    if (site_properties.use_local_storage.match("true"))
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    else
    {
        const delete_url = site_properties.server_url + "/" +employeePayrollData.id.toString();
        makeServiceCall("DELETE",delete_url,false)
        .then(responseText => {
            console.log(responseText);
        })
        .catch(error => {
            console.log("DELETE Error Status: "+JSON.stringify(error));
        })
    }
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
}

const update = (node) => {
    let employeePayRollData = employeePayrollList.find(emp => emp.id == node.id);
    if (!employeePayRollData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayRollData));
    window.location.replace(site_properties.add_employee_payroll_page);
};
