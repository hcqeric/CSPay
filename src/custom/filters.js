/**
 * 按需全局化过滤器
 * 您还可以在组件定义时的 filters 属性中按需引入
 */
// 定义方法：Vue.filter({name}, function(value){...})

import Vue from 'vue'

Vue.filter('genderFormat', function (type) { //获取第一个文件路径
  if (type == undefined || type == null) return;
  if(type === 0){
    return '男'
  }else if(type === 1){
    return '女'
  }
})

Vue.filter('DateFormat', function (date, fmt) { //格式化时间   DateFormat('yyyy-MM-dd hh:mm')
  if (date == undefined || date == null) return;
  date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
})

Vue.filter('moneyFormat', function (value, currency, decimals) {
  const digitsRE = /(\d{3})(?=\d)/g
  // value = parseFloat(value) / 100
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '￥'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
})

Vue.filter('bankcardFormat', function (value, showlength) {
  showlength = showlength != null ? showlength : 4
  let length = value.toString().length
  console.log(length)
  let replaceString = ''
  for (let index = 0; index < length; index++) {
    if (index > showlength - 1 && index < length - showlength) {
      replaceString += '*'
    }
  }
  return value.replace(value.substring(showlength, length - showlength), replaceString)
})

Vue.filter('firstFilePath', function (json) { //获取第一个文件路径
  if (json == undefined || json == null) return;
  try {
    var fileArr = JSON.parse(json);
    return fileArr[0].FilePath;
  } catch (e) {
    return '';
  }
})

Vue.filter('firstFilePathList', function (json) { //获取多个文件路径
  if (json == undefined || json == null) return;
  try {
    var fileList = JSON.parse(json);
    var fileArr = [];
    for (var i = 0; i < fileList.length; i++) {
      fileArr.push(fileList[i].FilePath)
    }
    return fileArr;
  } catch (e) {
    return '';
  }
})

Vue.filter('Interception', function (json, maxlength) { //截取字符串
  if (json == undefined || json == null) return;
  try {
    var Stringstr = json.toString();
    return Stringstr.length > maxlength ? Stringstr.substring(0, maxlength) : Stringstr
  } catch (e) {
    return '';
  }
})
