Date.prototype.format = function (formatString) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(formatString)) formatString = formatString.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(formatString)) formatString = formatString.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return formatString;
};

Date.prototype.yyyyMMdd_hhmmss = function () {
  return this.format('yyyy-MM-dd hh:mm:ss');
};

Object.defineProperty(Date.prototype, 'yyyyMMdd', {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function () {
    return this.format('yyyy-MM-dd');
  }
})

Object.defineProperty(String.prototype, 'toDate', {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function () {
    return new Date(this.substr(0, this.lastIndexOf('.')).replace(/-/g, '/'))
  }
})

Object.defineProperty(Date.prototype, 'enYyyyMMdd', {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function () {
    return this.format('yyyy/MM/dd');
  }
})
