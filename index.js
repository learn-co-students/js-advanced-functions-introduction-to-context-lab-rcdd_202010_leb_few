// Your code here
function createEmployeeRecord(arr){
  let obj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
  }
  return obj
}
function createEmployeeRecords(EmployeesArr){
 return EmployeesArr.map((element)=>{
     return createEmployeeRecord(element);
  })
}
 function createTimeInEvent(employee,dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
 function createTimeOutEvent(employee,dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
 function hoursWorkedOnDate(employee,date){
    let timeIn  = employee.timeInEvents.find((e) => e.date === date)

    let timeOut = employee.timeOutEvents.find((e) => e.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}
function wagesEarnedOnDate(employee,date){
 let rawWage = hoursWorkedOnDate(employee, date)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}
function allWagesFor(employee){
  let dates= employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}
 function findEmployeeByFirstName(Array, firstName) {
  return Array.find(function(item){
    return item.firstName === firstName
  })
}
let calculatePayroll = function(Array){
    return Array.reduce(function(acc, item){
        return acc + allWagesFor(item)
    }, 0)}
