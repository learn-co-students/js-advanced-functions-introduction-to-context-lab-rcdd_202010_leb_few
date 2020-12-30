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

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(arr){
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return employeeRecord
}

let createTimeOutEvent = function(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return employeeRecord
}

let hoursWorkedOnDate = function(employeeRecord, date){
    let inEvent = employeeRecord.timeInEvents.find(function(e){
        return e.date === date
    })

    let outEvent = employeeRecord.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employeeRecord, date){
    let owedAmount = hoursWorkedOnDate(employeeRecord, date)
        * employeeRecord.payPerHour
    return parseFloat(owedAmount.toString())
}

let allWagesFor = function(employeeRecord){
    let allDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let allPay = allDates.reduce(function(amount, d){
        return amount + wagesEarnedOnDate(employeeRecord, d)
    }, 0)

    return allPay
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(record){
    return record.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(amount, record){
        return amount + allWagesFor(record)
    }, 0)
}