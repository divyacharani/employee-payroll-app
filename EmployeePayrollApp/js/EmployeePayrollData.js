class EmployeePayrollData{
    id;
    
    get name(){
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
        if (nameRegex.test(name))
            this._name = name;
        else
            throw 'Name is Invalid!'
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
    set notes(notes){
        this._notes = notes;
    }
    get startDate(){
        return this._startDate;
    }
    set startDate(startDate){
        let now = new Date();
        if (startDate > now)
        throw 'StartDate is Invalid!';
        let diff = Math.abs(now.getTime() - startDate.getTime());
        if(diff / (1000*60*60*24) > 30 )
            throw 'Start Date is beyond 30 Days!';
        this._startDate = startDate;       
    }

    toString() {
        const empDate = formatDate(this.startDate);
        return "id = "+this.id+", name = " + this.name + ", profilePic = " + this.profilePic + ", salary = " + this.salary + ", gender = " + this.gender + ", department = " + this.department + ", startDate = " + empDate + ", notes= " + this.notes;
    }
}