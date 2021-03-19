// Your code here
function createEmployeeRecord(arr){
   return {
     firstName:arr[0],
     familyName:arr[1],
     title:arr[2],
     payPerHour:arr[3],
     timeInEvents:[],
     timeOutEvents:[]
  };
}

function createEmployeeRecords(arr){
  return arr.map(m => createEmployeeRecord(m));
}

function createTimeInEvent(objIn,dateStamp){
 let stampIn=dateStamp.split(" ");
 objIn.timeInEvents.push({
   type: "TimeIn",
   hour:parseInt(stampIn[1],10),
   date: stampIn[0]
 })
  return objIn;
}

function createTimeOutEvent(objOut,dateStamp){
 let stampOut=dateStamp.split(" ");
 objOut.timeOutEvents.push({
   type: "TimeOut",
   hour: parseInt(stampOut[1],10),
   date: stampOut[0]
 })
  return objOut;
}

function hoursWorkedOnDate(obj,datestring){
  let workIn = obj.timeInEvents.find(t => t.date===datestring );
  let workOut= obj.timeOutEvents.find(t => t.date === datestring);
  return (workOut.hour - workIn.hour)/100;
}

function wagesEarnedOnDate(obj,datestring){
 let salaryperday = obj.payPerHour*hoursWorkedOnDate(obj,datestring);
 return salaryperday;
}
function allWagesFor(obj){
  let workingdate=obj.timeInEvents.map(e=>e.date);
  let salary= workingdate.reduce((sum,d)=> sum=sum+wagesEarnedOnDate(obj,d),0);
  return salary;
}
function findEmployeeByFirstName(srcArray,firstName){
  return srcArray.find(a => a.firstName===firstName);
}

function calculatePayroll(arr){
  let payments=arr.reduce((sum,a) => sum=sum+allWagesFor(a),0);
  return payments;
  
}

