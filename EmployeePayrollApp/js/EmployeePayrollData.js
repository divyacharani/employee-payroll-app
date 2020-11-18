class EmployeePayrollData{
    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }
    get name{
        return this._name;
    }
    set name(name){
        this._name = name;
    }
    get profilePic(){
        return this._profilePic;
    }
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }
    get gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender = gender;
    }
    get department(){
        return this._department;
    }
    set department(department){
        this._department = department;
    }
    get salary(){
        return this._salary;
    }
    set salary(salary){
        this._salary=salary;
    }
    get notes(){
        return this._notes;
    }
    set note(note){
        this._notes = notes;
    }
    get startDate(){
        return this._startDate;
    }
    set startDate(startDate){
        this._startDate = startDate;
    }

    toString() {
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric'
        };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-IN", options);
        return "name = " + this.name + ", profilePic = " + this.profilePic + ", salary = " + this.salary + ", gender = " + this.gender + ", department = " + this.department + ", startDate = " + empDate + ", notes= " + this.notes;
    }
}
