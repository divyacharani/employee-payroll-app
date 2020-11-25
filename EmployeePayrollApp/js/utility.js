const formatDate = (date) => {
    let startDate = new Date(date);
    const options = {
        year: 'numeric', month: 'long', day: 'numeric'
    }; 
    const empDate = !startDate ? "undefined" : startDate.toLocaleDateString("en-IN", options);
    return empDate;
}

const checkName=(name)=>{
    let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(name)) throw "Name is Incorrect!";
}

const checkStartDate=(startDate)=>{
    let now=new Date();
    if (startDate>now) throw 'Start Date is a Future Date!';
    var diff=Math.abs(now.getTime()-startDate.getTime());
    if(diff/(1000*60*60*24)>30){
        throw 'Start Date is beyond 30 days!'
    }
}