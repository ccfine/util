const util = {}

//千位符分隔
util.thousandBit = (number = 0) => {
  if (typeof number === "number") {
    number = String(number)
  }
  if (number.indexOf(",") > -1) {
    number = number.replace(/,/g, "")
  }
  const numArray = number.split(".")
  let intArray = numArray[0].split("").reverse()
  for (let i = 0; i < intArray.length; i++) {
    if (i !== 0 && i % 3 === 0) {
      intArray[i] = `${intArray[i]},`
    }
  }
  intArray = intArray.reverse().join("")
  let result = ""
  if (numArray[1]) {
    result = `${intArray}.${numArray[1]}`
  } else {
    result = intArray
  }
  return result
}

//与当前时间的间隔，可为刚刚、秒、分、时、天、月、年
util.timeInterval = time => {
  const now = Date.now()
  const oldTime = new Date(time).getTime()
  let time_interval = (now - oldTime) / 1000
  let result = ""
  if (time_interval < 0) {
    result = "这个时间有点问题啊~~"
  } else if (time_interval < 1) {  //1秒内
    result = "刚刚"
  } else if (time_interval < 60) {  //1分钟内
    time_interval = Math.round(time_interval)
    if (time_interval === 60) {
      result = "1分钟前"
    } else {
      result = `${time_interval}秒前`
    }
  } else if (time_interval < 3600) {  //1小时内
    time_interval = Math.round(time_interval / 60)
    if (time_interval === 60) {
      result = "1小时前"
    } else {
      result = `${time_interval}分钟前`
    }
  } else if (time_interval < 86400) {  //1天内
    time_interval = Math.round(time_interval / 3600)
    if (time_interval === 24) {
      result = "1天前"
    } else {
      result = `${time_interval}小时前`
    }
  } else if (time_interval < 2592000) {  //1个月内
    time_interval = Math.round(time_interval / 86400)
    if (time_interval === 30) {
      result = "1个月前"
    } else {
      result = `${time_interval}天前`
    }
  } else if (time_interval < 31104000) {  //1年内
    time_interval = Math.round(time_interval / 2592000)
    if (time_interval === 12) {
      result = "1年前"
    } else {
      result = `${time_interval}个月前`
    }
  } else {  //超过1年
    time_interval = Math.round(time_interval / 31104000)
    result = `${time_interval}年前`
  }
  return result
}

export default util