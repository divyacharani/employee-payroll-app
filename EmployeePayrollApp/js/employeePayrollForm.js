window.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector("#name");
    const nameError = document.querySelector(".name-error");
    name.addEventListener("input", function () {
        if (name.value.length == 0) {
            nameError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            nameError.textContent = "";
        } catch (error) {
            nameError.textContent = error;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
});
