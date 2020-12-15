// Your code here
function createEmployeeRecord(array){
 let list={
    firstName:array[0],
    familyName:array[1],
    title:array[2],
    payPerHour:array[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
  return list;
}
      
function createEmployeeRecords(array){
let arr=array.map(element=>createEmployeeRecord(element));
return arr;
  }
  
function createTimeInEvent(record,time){
  let a=time.split(" ")
  let object={};
    object.type="TimeIn";
    object.hour=parseInt(a[1]);
    object.date=a[0];
  record.timeInEvents.push(object);
  return record;
}

function createTimeOutEvent(record,time){
  let a=time.split(" ")
    let object={};
    object.type="TimeOut";
    object.hour=parseInt(a[1]);
    object.date=a[0];
  record.timeOutEvents.push(object);
  return record;
}

function hoursWorkedOnDate (record, time){
    let inDate = record.timeInEvents.find(function(i){
        return i.date === time;
    })
    let outDate = record.timeOutEvents.find(function(i){
        return i.date === time;
    })
    return (outDate.hour - inDate.hour) / 100;
}

  function findEmployeeByFirstName(array,name){
  let result = array.find((element) => element.firstName===name);
  return result?result:undefined;
  }
  
  function wagesEarnedOnDate(record,time){
  return parseInt(record.payPerHour)*hoursWorkedOnDate(record,time);
  }
  
  function allWagesFor (record){
    let dates = record.timeInEvents.map(function(i){
        return i.date;
    })

    let pay = dates.reduce(function(a, b){
        return a + wagesEarnedOnDate(record, b)
    },0)

    return pay;
}
  
function calculatePayroll (array){
 let grandTotalOwed = array.reduce((m, e) => m + allWagesFor(e), 0);
 return grandTotalOwed;
}



  

  
  





