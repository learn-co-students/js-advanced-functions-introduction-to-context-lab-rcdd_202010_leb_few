// Your code here
let createEmployeeRecord = function(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(array) {
    return array.map(function(arr){
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })

    return employeeRecord
}

let createTimeOutEvent = function(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employeeRecord
}

let hoursWorkedOnDate = function(employeeRecord, date){
    let hours = 0;
    let inEvent = employeeRecord.timeInEvents.find(function(e){
        return e.date === date
    })

    let outEvent = employeeRecord.timeOutEvents.find(function(e){
        return e.date === date
    })
    hours = (outEvent.hour - inEvent.hour) / 100
    return hours;
}

let wagesEarnedOnDate = function(employeeRecord, date){
    let wage = hoursWorkedOnDate(employeeRecord, date)
        * employeeRecord.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(employeeRecord){
    let eligibleDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(acc,el){
        return acc + wagesEarnedOnDate(employeeRecord, el)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(array, firstName) {
  return array.find(function(record){
    return record.firstName === firstName
  })
}

let calculatePayroll = function(array){
    return array.reduce(function(acc, el){
        return acc + allWagesFor(el)
    }, 0)
}