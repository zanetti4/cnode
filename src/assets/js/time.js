
export default {

  //字符串日期转换成日期格式

  stringToDate: function(dateStr, separator) {

    if (!separator) {

      separator = '-'

    }

    let dateArr = dateStr.slice(0, 10).split(separator)

    let timeArr = dateStr.slice(11).split(":")

    let year = parseInt(dateArr[0])

    let month;

    if (dateArr[1].indexOf('0') == '0') { //月份<10

      month = parseInt(dateArr[1].substring(1))

    } else { //月份>=10

      month = parseInt(dateArr[1])

    }

    let day = parseInt(dateArr[2])

 

    let hour = parseInt(timeArr[0]) || ''

    let minute = parseInt(timeArr[1]) || ''

    let second = parseInt(timeArr[2]) || ''

    var date = new Date(year, month - 1, day, hour, minute, second)

    return date

  },

  //获取两个时间之间的时间段

  getTime: function(startTime, endTime) {

    let end

    if (endTime) {

      end = this.stringToDate(endTime)

    } else {

      end = new Date()

    }

    let endYear = end.getFullYear()

    let endMonth = end.getMonth() + 1

    let endDay = end.getDate()

    let endHour = end.getHours()

    let endMinute = end.getMinutes()

    let endSecond = end.getSeconds()

 

    let start = this.stringToDate(startTime)

      // 获取某一时间的年月日

    let startYear = start.getFullYear()

    let startMonth = start.getMonth() + 1

    let startDay = start.getDate()

    let startHour = start.getHours()

    let startMinute = start.getMinutes()

    let startSecond = start.getSeconds()

 

    let year, month, day, hour, minute, second

 

    //计算

    year = (endYear - startYear) > 0 ? (endYear - startYear) : 0

 

    if (endMonth > startMonth) {

      month = endMonth - startMonth

    } else if (endMonth == startMonth) {

      month = 0

    } else {

      if (year > 0) {

        year = year - 1

      }

      month = 12 - startMonth + endMonth

    }

 

    if (endDay > startDay) {

      day = endDay - startDay

    } else if (endDay == startDay) {

      day = 0

    } else {

      if (startMonth == 1 || startMonth == 3 || startMonth == 5 || startMonth == 7 || startMonth == 8 || startMonth == 10 || startMonth == 12) {

        day = 31 - startDay + endDay

      } else if (startMonth == 2) {

        //闰年 能被4整除 2月份是29天，不能就是28天

        if (startYear % 4 == 0 && startYear % 100 != 0 || startYear % 400 == 0) {

          day = 29 - startDay + endDay

        } else {

          day = 28 - startDay + endDay

        }

      } else {

        day = 30 - startDay + endDay

      }

      if (month > 0) {

        month = month - 1

      }

    }

 

    if (endHour > startHour) {

      hour = endHour - startHour

    } else if (endHour == startHour) {

      hour = 0

    } else {

      hour = 24 - startHour + endHour

      if (day > 0) {

        day = day - 1

      }

    }

 

    if (endMinute > startMinute) {

      minute = endMinute - startMinute

    } else if (endMinute == startMinute) {

      minute = 0

    } else {

      minute = 60 - startMinute + endMinute

      if (hour > 0) {

        hour = hour - 1

      }

    }

 

    if (endSecond > startSecond) {

      second = endSecond - startSecond

    } else if (endSecond == startSecond) {

      second = 0

    } else {

      second = 60 - startSecond + endSecond

      if (minute > 0) {

        minute = minute - 1

      }

    }

 

    return {

      year: year,

      month: month,

      day: day,

      hour: hour,

      minute: minute,

      second: second

    }

  }

}