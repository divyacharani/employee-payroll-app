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

function makeServiceCall(methodType, url, async, data) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log("State Changed Called. Ready State: " + xhr.readyState + " Status: " + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$'))
                resolve(xhr.responseText);
            else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }

            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }

        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to the server");
    });
}