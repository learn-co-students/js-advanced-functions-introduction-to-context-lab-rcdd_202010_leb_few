// Your code here

//1
function createEmployeeRecord(array){
 let employee={
    firstName:array[0],
    familyName:array[1],
    title:array[2],
    payPerHour:array[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
  return employee;
}

//2
function createEmployeeRecords(array1){
let arr=array1.map(el => createEmployeeRecord(el));
return arr;
  }

//3
function createTimeInEvent(record,time){
  let rec={};
    rec.type="TimeIn";
    rec.hour=parseInt(time.substring(11));
    rec.date=time.substring(0,10);
  record.timeInEvents.push(rec);
  return record;
}

//4
function createTimeOutEvent(record,time){
    let object={};
    object.type="TimeOut";
    object.hour=parseInt(time.substring(11));
    object.date=time.substring(0,10);
  record.timeOutEvents.push(object);
  return record;
}

//5
function hoursWorkedOnDate (record, time){
    let inDate = record.timeInEvents.find(function(i){
        return i.date === time;
    })
    let outDate = record.timeOutEvents.find(function(i){
        return i.date === time;
    })
    return (outDate.hour - inDate.hour) / 100;
}

//6
  function wagesEarnedOnDate(record,time){
  return parseInt(record.payPerHour)*hoursWorkedOnDate(record,time);
  }

//7
  function allWagesFor (record){
    let dates = record.timeInEvents.map(function(i){
        return i.date;
    })

    let pay = dates.reduce(function(a, b){
        return a + wagesEarnedOnDate(record, b)
    },0)

    return pay;
}

//8
function findEmployeeByFirstName(array2,name){
  let result = array2.find((element) => element.firstName===name);
  if(result)
  return result;
  else
  undefined;
  }
 

//9
function calculatePayroll (array){
 let grandTotalOwed = array.reduce((m, e) => m + allWagesFor(e), 0);
 return grandTotalOwed;
}
